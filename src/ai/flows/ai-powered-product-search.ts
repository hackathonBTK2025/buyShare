
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
  saveCount: z.number(),
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
  prompt: `Sen uzman bir e-ticaret ürün arama asistanısın.
Bir kullanıcı ürünler için doğal dilde bir sorgu sağlayacaktır. Görevin:
1.  Kullanıcının sorgusunu ve/veya fotoğrafını analiz ederek ürün tipi, renk, malzeme ve diğer özellikler ("yazlık", "sıcak tutmayan" gibi) gibi temel ürün niteliklerini çıkar.
2.  Bu çıkarılan niteliklerle 'fetchProductsFromEcommerce' aracını kullanarak Trendyol, Amazon veya Hepsiburada gibi e-ticaret sitelerinden ürünleri ara.
3.  Aracın sonuçlarına dayanarak, en alakalı ürünlerin bir listesini döndür.
4.  Her ürün için, kullanıcının özel sorgusuna neden iyi bir eşleşme olduğuna dair bir 'uygunlukAçıklaması' (suitabilityExplanation) sağla.
5.  Arama sonuçlarını özetleyen genel bir 'açıklama' (explanation) sağla.

Örnek Sorgu: "mavi, yazın sıcak tutmayan bir gömlek arıyorum"
- Araç için çıkarılan nitelikler: itemType: "gömlek", color: "mavi", attributes: ["yazlık", "sıcak tutmayan"]

Kullanıcı Sorgusu: {{{query}}}
{{#if photoDataUri}}
Kullanıcı Fotoğrafı: {{media url=photoDataUri}}
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
    if (!output) {
        console.log("AI model returned null. Implementing fallback search.");
        const fallbackProducts = allProducts.filter(p => p.name.toLowerCase().includes(input.query.toLowerCase()) || p.description.toLowerCase().includes(input.query.toLowerCase()));
        
        if (fallbackProducts.length > 0) {
            return {
                products: fallbackProducts.slice(0, 5).map(p => ({
                    ...p,
                    suitabilityExplanation: `Bu ürün, "${input.query}" aramanızla ilgili olabilecek genel bir eşleşmedir.`
                })),
                explanation: `İsteğiniz için en iyi sonuçları bulmakta zorlandım, ancak "${input.query}" ile ilgili olabilecek bazı ürünler aşağıda listelenmiştir.`
            };
        } else {
             return {
                products: [],
                explanation: `Üzgünüm, "${input.query}" ile eşleşen bir ürün bulamadım. Lütfen farklı anahtar kelimelerle tekrar deneyin.`
            };
        }
    }
    
    return output;
  }
);
