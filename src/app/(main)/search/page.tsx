"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Loader2 } from "lucide-react";
import {
  aiPoweredProductSearch,
  AiPoweredProductSearchInput,
  AiPoweredProductSearchOutput,
} from "@/ai/flows/ai-powered-product-search";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { products as allProducts } from "@/lib/data"; // mock product data

type SearchState = {
  result: AiPoweredProductSearchOutput | null;
  error: string | null;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [state, formAction] = useFormState<SearchState, FormData>(
    async (prevState, formData) => {
      const query = formData.get("query") as string;
      if (!query) return { result: null, error: "Please enter a search query." };
      
      try {
        const input: AiPoweredProductSearchInput = { query };
        const result = await aiPoweredProductSearch(input);
        
        // In a real app, you'd use the IDs from the result to fetch full product details.
        // Here, we'll just filter our mock data for demonstration.
        const productIds = result.products.map(p => p.id);
        const suggestedProducts = allProducts.filter(p => productIds.includes(p.id));
        
        // We'll augment the AI result with full product objects
        const enrichedResult = {
            ...result,
            products: suggestedProducts.map(p => ({
                ...p,
                suitabilityExplanation: result.products.find(rp => rp.id === p.id)?.suitabilityExplanation || ""
            }))
        }
        
        // The AI might return products not in our mock list, so we'll just use what we have.
        // For the demo we replace the AI's products with our mock product objects
        result.products = result.products.map(p => {
            const mockProduct = allProducts.find(mp => mp.name.toLowerCase().includes(p.name.split(' ')[1].toLowerCase()));
            return {
                ...p,
                ...(mockProduct)
            }
        })

        return { result, error: null };
      } catch (e: any) {
        return { result: null, error: e.message || "An unexpected error occurred." };
      }
    },
    { result: null, error: null }
  );
  
  const [isPending, setIsPending] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    await formAction(formData);
    setIsPending(false);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Let AI find it for you</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Describe what you're looking for in your own words.
        </p>
      </div>
      <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          <Input
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., blue, cool jeans to wear in summer"
            className="text-base"
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Search"}
          </Button>
        </div>
      </form>

      {isPending && (
         <div className="text-center py-12">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">AI is thinking...</p>
         </div>
      )}

      {state.error && <p className="text-destructive text-center">{state.error}</p>}
      
      {state.result && (
        <div>
          <div className="mb-8 p-6 bg-card rounded-lg shadow">
             <h2 className="text-2xl font-semibold mb-2">AI's Recommendation</h2>
             <p className="text-muted-foreground">{state.result.explanation}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.result.products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
