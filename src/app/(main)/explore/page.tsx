
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { products as allProducts } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Heart, Loader2, X, Star } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { Separator } from '@/components/ui/separator';

// Helper to shuffle array and get new items
const getNewProducts = (existingIds: Set<string>): Product[] => {
    const availableProducts = allProducts.filter(p => !existingIds.has(p.id));
    if (availableProducts.length === 0) {
        // If all products are shown, start repeating them but shuffle to look fresh
        return [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 10);
    }
    return availableProducts.sort(() => 0.5 - Math.random()).slice(0, 10);
};


const ProductDetailView = ({ product }: { product: Product }) => (
    <div className="p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                    src={product.imageUrls[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint="product image"
                />
            </div>
            <div className="flex flex-col gap-4">
                 <div>
                    <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                    <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">123 Yorum</p>
                    </div>
                </div>
                <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
                <p className="text-muted-foreground">{product.description}</p>
                <AddToCartButton product={product} />
            </div>
        </div>
    </div>
);


export default function ExplorePage() {
  const [products, setProducts] = useState<Product[]>(allProducts.slice(0, 15));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    <Dialog open={!!selectedProduct} onOpenChange={(isOpen) => !isOpen && setSelectedProduct(null)}>
        <div className="container mx-auto">
        <div className="text-center my-8">
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
                <DialogTrigger asChild key={key}>
                    <button
                        onClick={() => setSelectedProduct(product)}
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
                    </button>
                </DialogTrigger>
            );
            })}
        </div>
        {isLoading && (
            <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}

        <DialogContent className="max-w-4xl h-[90vh] p-0">
            <div className="overflow-y-auto h-full">
                {selectedProduct && <ProductDetailView product={selectedProduct} />}
                <Separator/>
                <h2 className="text-2xl font-bold p-4 md:px-8">Daha Fazla Keşfet</h2>
                 <div className="grid grid-cols-3 gap-1 p-4 md:px-8">
                    {products.filter(p => p.id !== selectedProduct?.id).slice(0, 9).map((product) => (
                         <button key={product.id} onClick={() => setSelectedProduct(product)} className="group relative aspect-square overflow-hidden rounded-md">
                             <Image
                                src={product.imageUrls[0]}
                                alt={product.name}
                                fill
                                className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                                data-ai-hint="product image"
                            />
                         </button>
                    ))}
                 </div>
            </div>
        </DialogContent>
        </div>
    </Dialog>
  );
}
