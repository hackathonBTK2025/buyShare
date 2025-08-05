
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
  categoryId: z.string(),
  stockQuantity: z.number(),
  aiSummary: z.string().optional(),
  createdAt: z.string(),
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
        const fallbackQuery = input.itemType.toLowerCase();
        searchResults = allProducts.filter(product => product.name.toLowerCase().includes(fallbackQuery) || product.description.toLowerCase().includes(fallbackQuery));
    }

    // Generate random but realistic image URLs for the search results
    const resultsWithImages = searchResults.map(p => ({
        ...p,
        imageUrls: p.imageUrls.length > 0 ? p.imageUrls : [`https://placehold.co/600x800.png`]
    }))


    console.log(`Found ${resultsWithImages.length} mock products.`);

    // Return the full product object
    return {
      products: resultsWithImages.slice(0, 5)
    };
  }
);

ai.defineTool(
    {
        name: 'getProductInfo',
        description: `You are an AI shopping assistant. Given any product name, you must return a JSON object with the following fields:
- id: unique product id
- name: product name
- description: a detailed product description (2-3 sentences)
- price: a realistic price in Turkish Lira (e.g., "749 TL")
- image: a random but realistic product image URL similar to images from Trendyol or Amazon.

The image URL must look plausible, in the format "https://..." ending with .jpg or .png, and should match the product context. You must never return empty or null image fields.

Example response:
{
  "id": "12345",
  "name": "Ergonomic Office Chair",
  "description": "Comfortable and stylish ergonomic office chair with adjustable height and lumbar support. Perfect for long hours of work or gaming.",
  "price": "2.499 TL",
  "image": "https://placehold.co/600x800.png"
}`,
        inputSchema: z.object({
            productName: z.string(),
        }),
        outputSchema: z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            price: z.string(),
            image: z.string(),
        }),
    },
    async (input) => {
        // This is a mock implementation. In a real scenario, you might call an external API or a database.
        // For now, we'll generate some plausible random data.
        const randomId = Math.random().toString(36).substring(7);
        const price = (Math.random() * 500 + 50).toFixed(2); // Random price between 50 and 550
        
        return {
            id: randomId,
            name: input.productName,
            description: `This is a high-quality ${input.productName}. Perfect for various occasions and styles. Made with the finest materials.`,
            price: `${price} TL`,
            image: `https://placehold.co/600x800.png`
        }
    }
)
