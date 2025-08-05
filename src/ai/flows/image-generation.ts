
'use server';

/**
 * @fileOverview An AI agent that generates an image from a text prompt.
 *
 * - generateImage - A function that generates an image from a prompt.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.string();

export async function generateImage(prompt: string): Promise<string> {
  return generateImageFlow(prompt);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: z.string(),
  },
  async (prompt) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A high-resolution, professionally-shot photograph of ${prompt}, in the style of a fashion catalog. The product should be the main focus, set against a clean, minimalist background that complements its colors. The lighting should be bright and even, highlighting the texture and details of the material. There should be no people or distractions in the image.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return media.url;
  }
);
