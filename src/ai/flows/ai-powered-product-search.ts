
'use server';
/**
 * @fileOverview AI-powered product search flow.
 *
 * - aiPoweredProductSearch - A function that handles product searches using natural language.
 * - AiPoweredProductSearchInput - The input type for the aiPoweredProductSearch function.
 * - AiPoweredProductSearchOutput - The return type for the aiPoweredProductSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { fetchProductsFromEcommerce } from '../tools/product-search-tool';
import { searchUnsplash } from '../tools/unsplash-search-tool';
import { products as allProducts } from '@/lib/data';
import type { Product } from '@/lib/types';


const AiPoweredProductSearchInputSchema = z.object({
  query: z.string().describe('The user query to search products.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of a product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type AiPoweredProductSearchInput = z.infer<typeof AiPoweredProductSearchInputSchema>;

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrls: z.array(z.string()),
  properties: z.object({
    fabric: z.string().optional(),
    color: z.string().optional(),
    size: z.string().optional(),
    material: z.string().optional(),
  }),
  likeCount: z.number(),
  categoryId: z.string(),
  stockQuantity: z.number(),
  aiSummary: z.string().optional(),
  createdAt: z.string(),
});

const AiPoweredProductSearchOutputSchema = z.object({
  products: z.array(
    ProductSchema.extend({
      suitabilityExplanation: z
        .string()
        .describe('Explanation of why the product is suitable for the query.'),
    })
  ).optional().describe('Array of products relevant to the search query.'),
  images: z.array(
    z.object({
      url: z.string(),
      alt: z.string(),
    })
  ).optional().describe('Array of inspirational images from Unsplash.'),
  explanation: z.string().describe('Explanation of why the products or images are suitable for the query.'),
});

export type AiPoweredProductSearchOutput = z.infer<typeof AiPoweredProductSearchOutputSchema>;

export async function aiPoweredProductSearch(
  input: AiPoweredProductSearchInput
): Promise<AiPoweredProductSearchOutput> {
  return aiPoweredProductSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredProductSearchPrompt',
  input: {schema: AiPoweredProductSearchInputSchema},
  output: {schema: AiPoweredProductSearchOutputSchema},
  tools: [fetchProductsFromEcommerce, searchUnsplash],
  prompt: `You are an expert e-commerce product search assistant named Gemini. Your goal is to help users find products or inspiration.

Analyze the user's query and/or photo.
- If the user is asking for specific products to buy (e.g., "find me a...", "I want to buy...", "price of..."), use the 'fetchProductsFromEcommerce' tool. Extract key attributes like item type, color, material, and other qualities (e.g., "for summer", "doesn't get hot") to use with the tool. For each product found, provide a 'suitabilityExplanation'.
- If the user is looking for ideas or inspiration (e.g., "show me...", "ideas for...", "images of..."), use the 'searchUnsplash' tool to find relevant, high-quality photos.
- If no specific products or images are found, provide a helpful and friendly message to the user.

Always provide an overall 'explanation' that summarizes the search results.

User Query: {{{query}}}
{{#if photoDataUri}}
User Photo: {{media url=photoDataUri}}
{{/if}}
`,
});

const aiPoweredProductSearchFlow = ai.defineFlow(
  {
    name: 'aiPoweredProductSearchFlow',
    inputSchema: AiPoweredProductSearchInputSchema,
    outputSchema: AiPoweredProductSearchOutputSchema,
  },
  async (input) => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;

    // Fallback mechanism only if the AI model returns null or no results.
    if (!output || (!output.products && !output.images) || (output.products?.length === 0 && output.images?.length === 0)) {
        console.log("AI model returned no valid results. Implementing fallback search.");
        const fallbackQuery = input.query.toLowerCase();
        const fallbackProducts = allProducts.filter(p => 
            p.name.toLowerCase().includes(fallbackQuery) || 
            p.description.toLowerCase().includes(fallbackQuery) ||
            p.properties.color?.toLowerCase().includes(fallbackQuery) ||
            p.properties.fabric?.toLowerCase().includes(fallbackQuery)
        );
        
        const productsWithExplanation = fallbackProducts.map(p => ({
            ...p,
            suitabilityExplanation: `Bu ürün, "${input.query}" aramanızla ilgili olabilecek genel bir eşleşmedir.`
        }));

        if (productsWithExplanation.length > 0) {
            return {
                products: productsWithExplanation.slice(0, 5),
                explanation: `İsteğiniz için en iyi sonuçları bulmakta zorlandım, ancak "${input.query}" ile ilgili olabilecek bazı ürünler şunlardır.`
            };
        } else {
             return {
                products: [],
                images: [],
                explanation: `Üzgünüm, "${input.query}" ile eşleşen herhangi bir ürün veya görsel bulamadım. Lütfen farklı anahtar kelimelerle tekrar deneyin.`
            };
        }
    }
    
    // If the output is valid, return it directly.
    return output;
  }
);
