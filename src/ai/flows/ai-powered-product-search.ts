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
  prompt: `You are an expert e-commerce product search assistant.
A user will provide a natural language query for products. Your task is to:
1.  Analyze the user's query to extract key product attributes like item type, color, material, and other features (e.g., "for summer", "warm").
2.  Use the 'fetchProductsFromEcommerce' tool with these extracted attributes to search for products on e-commerce websites like Trendyol, Amazon, or Hepsiburada.
3.  Based on the tool's results, return a list of the most relevant products.
4.  For each product, provide a 'suitabilityExplanation' detailing why it's a good match for the user's specific query.
5.  Provide a general 'explanation' summarizing the search results.

Example Query: "mavi, yazın sıcak tutmayan bir gömlek arıyorum"
- Extracted attributes for the tool: itemType: "gömlek", color: "mavi", attributes: ["yazlık", "sıcak tutmayan"]

User Query: {{{query}}}
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
