
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

const AiPoweredProductSearchOutputSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().describe('The product ID.'),
      name: z.string().describe('The name of the product.'),
      description: z.string().describe('A short description of the product.'),
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
4.  Her ürün için, kullanıcının özel sorgusuna neden iyi bir eşleşme olduğuna dair bir 'uygunlukAçıklaması' sağla.
5.  Arama sonuçlarını özetleyen genel bir 'açıklama' sağla.

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
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    