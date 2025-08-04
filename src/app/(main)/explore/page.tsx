
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products as allProducts } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Heart, Loader2 } from 'lucide-react';
import type { Product } from '@/lib/types';

// Helper to shuffle array and get new items
const getNewProducts = (existingIds: Set<string>): Product[] => {
    const availableProducts = allProducts.filter(p => !existingIds.has(p.id));
    if (availableProducts.length === 0) {
        // If all products are shown, start repeating them but shuffle to look fresh
        return [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 5);
    }
    return availableProducts.sort(() => 0.5 - Math.random()).slice(0, 5);
};


export default function ExplorePage() {
  const [products, setProducts] = useState<Product[]>(allProducts.slice(0, 10));
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreProducts = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
        const existingIds = new Set(products.map(p => p.id));
        const newProducts = getNewProducts(existingIds);

        // Add a unique key for repeated products to avoid React key issues
        const newProductsWithUniqueKeys = newProducts.map(p => ({
            ...p,
            uniqueId: `${p.id}-${Date.now()}-${Math.random()}`
        }));

        // @ts-ignore
        setProducts(prev => [...prev, ...newProductsWithUniqueKeys]);
        setIsLoading(false);
    }, 500);
  }, [isLoading, products]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user is near the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts]);


  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Keşfet</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Yeni trendleri, popüler ürünleri ve sana özel önerileri keşfet.
        </p>
      </div>

      <div className="grid grid-cols-3 grid-rows-auto gap-1">
        {products.map((product, index) => {
          const isLarge = index % 5 === 0;
          // @ts-ignore
          const key = product.uniqueId || product.id;
          return (
            <Link
              key={key}
              href={`/product/${product.id}`}
              className={cn(
                'group relative aspect-square overflow-hidden rounded-md shadow-lg',
                {
                  'col-span-2 row-span-2': isLarge,
                  'col-span-1 row-span-1': !isLarge,
                }
              )}
            >
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                fill
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                data-ai-hint="product image"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Heart className="h-6 w-6" />
                        <span>{product.likeCount}</span>
                    </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {isLoading && (
        <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
