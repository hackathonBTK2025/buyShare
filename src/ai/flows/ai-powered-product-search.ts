
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
  ).describe('Array of products relevant to the search query.'),
  explanation: z.string().describe('Explanation of why the products are suitable for the query.'),
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
  tools: [fetchProductsFromEcommerce],
  prompt: `You are an expert e-commerce product search assistant.
A user will provide a natural language query for products. Your task is to:
1.  Analyze the user's query and/or photo to extract key product attributes like item type, color, material, and other qualities (e.g., "for summer", "doesn't get hot").
2.  Use the 'fetchProductsFromEcommerce' tool with these extracted attributes to search for products from e-commerce sites like Trendyol, Amazon, or Hepsiburada.
3.  Based on the tool's results, return a list of the most relevant products.
4.  For each product, provide a 'suitabilityExplanation' of why it's a good match for the user's specific query.
5.  Provide an overall 'explanation' that summarizes the search results.

Example Query: "I'm looking for a blue shirt that won't be too hot for summer"
- Extracted attributes for tool: itemType: "shirt", color: "blue", attributes: ["summer", "cool"]

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
    const {output} = await prompt(input);
    
    // Fallback mechanism if the AI model returns null
    if (!output || !output.products || output.products.length === 0) {
        console.log("AI model returned null or no products. Implementing fallback search.");
        const fallbackQuery = input.query.toLowerCase();
        const fallbackProducts = allProducts.filter(p => p.name.toLowerCase().includes(fallbackQuery) || p.description.toLowerCase().includes(fallbackQuery));
        
        const productsWithImages = fallbackProducts.map(p => ({
            ...p,
            imageUrls: p.imageUrls.length > 0 ? p.imageUrls : [`https://placehold.co/600x800?text=${encodeURIComponent(p.name)}`],
            suitabilityExplanation: `This product is a general match that might be relevant to your search for "${input.query}".`
        }));

        if (productsWithImages.length > 0) {
            return {
                products: productsWithImages.slice(0, 5),
                explanation: `I had trouble finding the best results for your request, but here are some products that might be related to "${input.query}".`
            };
        } else {
             return {
                products: [],
                explanation: `Sorry, I couldn't find any products matching "${input.query}". Please try again with different keywords.`
            };
        }
    }
    
    return output;
  }
);
