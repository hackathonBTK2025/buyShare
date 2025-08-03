'use server';
/**
 * @fileOverview A tool for fetching product information from e-commerce websites.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { products as allProducts } from '@/lib/data';

export const fetchProductsFromEcommerce = ai.defineTool(
  {
    name: 'fetchProductsFromEcommerce',
    description: 'Fetches products from a specified e-commerce website based on a search query. Use this tool to find real products from online stores like Trendyol, Amazon, or Hepsiburada.',
    inputSchema: z.object({
      query: z.string().describe('The product search query (e.g., "blue jeans", "summer dress").'),
      site: z.enum(['Trendyol', 'Amazon', 'Hepsiburada']).describe('The e-commerce site to search on.'),
    }),
    outputSchema: z.object({
      products: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          description: z.string(),
          price: z.number(),
        })
      ),
    }),
  },
  async (input) => {
    console.log(`Searching for "${input.query}" on ${input.site}`);
    
    // In a real application, you would implement logic to scrape or call the API
    // of the specified e-commerce site.
    // For this prototype, we'll return mock data based on the query.
    
    // Simple mock implementation: filter the existing products based on the query.
    const searchResults = allProducts.filter(product => 
        product.name.toLowerCase().includes(input.query.toLowerCase()) || 
        product.description.toLowerCase().includes(input.query.toLowerCase())
    ).slice(0, 5); // Return a max of 5 results

    console.log(`Found ${searchResults.length} mock products.`);

    return {
      products: searchResults.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
      })),
    };
  }
);
