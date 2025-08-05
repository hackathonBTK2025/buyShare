'use server';
/**
 * @fileOverview A tool for searching images on Unsplash.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const searchUnsplash = ai.defineTool(
  {
    name: 'searchUnsplash',
    description:
      'Searches for high-quality photos on Unsplash. Use this when the user is looking for inspiration, ideas, or types of images rather than a specific product to buy.',
    inputSchema: z.object({
      query: z
        .string()
        .describe(
          'The search query for images, e.g., "summer dress", "blue jeans".'
        ),
    }),
    outputSchema: z.object({
      images: z.array(
        z.object({
          url: z.string().describe('The URL of the found image.'),
          alt: z.string().describe('A descriptive alt text for the image.'),
        })
      ),
    }),
  },
  async (input) => {
    console.log(`Searching Unsplash for: ${input.query}`);
    // This is a mock implementation. In a real app, you would use the Unsplash API.
    // We will generate plausible-looking Unsplash URLs.
    const images = Array.from({ length: 4 }, (_, i) => {
      const queryParams = new URLSearchParams({
        crop: 'entropy',
        cs: 'tinysrgb',
        fit: 'max',
        fm: 'jpg',
        ixid: `M3w3NDE5ODJ8MHwxfHNlYXJjaHw${i + 1}fHx${encodeURIComponent(input.query)}fGVufDB8fHx8MTc1NDM5MjQwOHww`,
        ixlib: 'rb-4.1.0',
        q: '80',
        w: '1080',
      }).toString();
      
      return {
        url: `https://images.unsplash.com/photo-${1700000000000 + Math.floor(Math.random() * 999999999999)}-${Math.random().toString(16).substring(2, 14)}?${queryParams}`,
        alt: `A photo of ${input.query}`,
      };
    });

    return { images };
  }
);
