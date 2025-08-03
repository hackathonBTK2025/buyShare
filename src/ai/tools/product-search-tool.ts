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
    description: 'Fetches products from an e-commerce database based on structured attributes. Use this tool to find real products from online stores like Trendyol, Amazon, or Hepsiburada by providing specific features.',
    inputSchema: z.object({
      itemType: z.string().describe('The type of clothing or item (e.g., "gömlek", "kot pantolon", "ceket").'),
      color: z.string().optional().describe('The desired color of the item.'),
      attributes: z.array(z.string()).optional().describe('Other defining features or attributes (e.g., "yazlık", "keten", "suya dayanıklı").'),
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
    console.log(`Structured search for "${JSON.stringify(input)}" on ${input.site}`);
    
    // In a real application, you would implement logic to call the API of the specified site.
    // For this prototype, we return mock data, filtering based on the structured input.
    
    let searchResults = allProducts.filter(product => {
      const nameLower = product.name.toLowerCase();
      const descriptionLower = product.description.toLowerCase();
      const propertiesString = JSON.stringify(product.properties).toLowerCase();

      // Check item type
      if (!nameLower.includes(input.itemType.toLowerCase())) {
          return false;
      }

      // Check color
      if (input.color && !nameLower.includes(input.color.toLowerCase()) && !(product.properties.color?.toLowerCase().includes(input.color.toLowerCase()))){
         return false;
      }
      
      // Check attributes
      if (input.attributes && input.attributes.length > 0) {
        for (const attr of input.attributes) {
            const attrLower = attr.toLowerCase();
            // A simple check in name, description, and properties
            if (!nameLower.includes(attrLower) && !descriptionLower.includes(attrLower) && !propertiesString.includes(attrLower)) {
                // More advanced logic could be here, e.g., "sıcak tutmayan" -> check for "keten", "yazlık" etc.
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

    // If no results, do a broader search with just the item type as a fallback
    if (searchResults.length === 0) {
        searchResults = allProducts.filter(product => product.name.toLowerCase().includes(input.itemType.toLowerCase()));
    }


    console.log(`Found ${searchResults.length} mock products.`);

    return {
      products: searchResults.slice(0, 5).map(p => ({ // Return a max of 5 results
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
      })),
    };
  }
);
