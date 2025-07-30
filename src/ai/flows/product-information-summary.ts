'use server';

/**
 * @fileOverview An AI agent that generates a product information summary.
 *
 * - generateProductSummary - A function that generates a product summary.
 * - GenerateProductSummaryInput - The input type for the generateProductSummary function.
 * - GenerateProductSummaryOutput - The return type for the generateProductSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductSummaryInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('The detailed description of the product.'),
  productFeatures: z.string().describe('The key features of the product.'),
});
export type GenerateProductSummaryInput = z.infer<typeof GenerateProductSummaryInputSchema>;

const GenerateProductSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise and user-friendly summary of the product, including fabric information and usage suggestions.'),
});
export type GenerateProductSummaryOutput = z.infer<typeof GenerateProductSummaryOutputSchema>;

export async function generateProductSummary(input: GenerateProductSummaryInput): Promise<GenerateProductSummaryOutput> {
  return generateProductSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductSummaryPrompt',
  input: {schema: GenerateProductSummaryInputSchema},
  output: {schema: GenerateProductSummaryOutputSchema},
  prompt: `You are an AI assistant specializing in creating user-friendly product summaries for e-commerce websites.

  Based on the following product information, generate a concise and understandable summary that highlights the product's benefits and suitability for the user's needs. Include fabric information and usage suggestions where applicable.

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Product Features: {{{productFeatures}}}

  Summary:`,
});

const generateProductSummaryFlow = ai.defineFlow(
  {
    name: 'generateProductSummaryFlow',
    inputSchema: GenerateProductSummaryInputSchema,
    outputSchema: GenerateProductSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
