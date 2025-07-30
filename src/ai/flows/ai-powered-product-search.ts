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
  prompt: `You are an e-commerce product search assistant. A user will provide a
natural language query for products, and you will return a list of relevant
products with a short description and an explanation of why they are suitable.

Query: {{{query}}}

Return the products in the following JSON format:

{
  "products": [
    {
      "id": "product1",
      "name": "Blue Jeans",
      "description": "Comfortable blue jeans.",
      "suitabilityExplanation": "These jeans are blue and suitable for summer.",
    },
    {
      "id": "product2",
      "name": "Cool Jeans",
      "description": "Stylish cool jeans.",
      "suitabilityExplanation": "These jeans are cool and stylish for summer.",
    },
  ],
  "explanation": "The products are blue and cool, suitable for summer.",
}
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
