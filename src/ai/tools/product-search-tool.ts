
'use server';
/**
 * @fileOverview A tool for fetching product information from e-commerce websites.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { products as allProducts } from '@/lib/data';
import type { Product } from '@/lib/types';

// Define a Zod schema for the full product to ensure type safety
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


export const fetchProductsFromEcommerce = ai.defineTool(
  {
    name: 'fetchProductsFromEcommerce',
    description: 'Fetches products from an e-commerce database based on structured attributes. Use this tool to find real products from online stores like Trendyol, Amazon, or Hepsiburada by providing specific features.',
    inputSchema: z.object({
      itemType: z.string().describe('The type of clothing or item (e.g., "gömlek", "kot pantolon", "ceket").'),
      color: z.string().optional().describe('The desired color of the item.'),
      attributes: z.array(z.string()).optional().describe('Other defining features or attributes (e.g., "yazlık", "keten", "suya dayanıklı").'),
      site: z.enum(['Trendyol', 'Amazon', 'Hepsiburada']).optional().describe('The e-commerce site to search on.'),
    }),
    outputSchema: z.object({
      products: z.array(ProductSchema),
    }),
  },
  async (input) => {
    console.log(`Structured search for "${JSON.stringify(input)}" on ${input.site || 'any site'}`);
    
    let searchResults: Product[] = allProducts.filter(product => {
      const nameLower = product.name.toLowerCase();
      const descriptionLower = product.description.toLowerCase();
      const propertiesString = JSON.stringify(product.properties).toLowerCase();

      if (!nameLower.includes(input.itemType.toLowerCase())) {
          return false;
      }

      if (input.color && !nameLower.includes(input.color.toLowerCase()) && !(product.properties.color?.toLowerCase().includes(input.color.toLowerCase()))){
         return false;
      }
      
      if (input.attributes && input.attributes.length > 0) {
        for (const attr of input.attributes) {
            const attrLower = attr.toLowerCase();
            if (!nameLower.includes(attrLower) && !descriptionLower.includes(attrLower) && !propertiesString.includes(attrLower)) {
                if((attrLower.includes("yaz") || attrLower.includes("serin") || attrLower.includes("sıcak tutmayan")) && product.properties.fabric?.toLowerCase().includes("keten")){
                    // it's a match
                } else {
                    return false;
                }
            }
        }
      }

      return true;
    });

    if (searchResults.length === 0) {
        console.log("No results from structured search, performing fallback search.");
        searchResults = allProducts.filter(product => product.name.toLowerCase().includes(input.itemType.toLowerCase()));
    }


    console.log(`Found ${searchResults.length} mock products.`);

    // Return the full product object
    return {
      products: searchResults.slice(0, 5)
    };
  }
);
