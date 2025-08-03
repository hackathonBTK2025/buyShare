"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product & { suitabilityExplanation?: string };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={`/product/${product.id}`}>
        <CardContent className="p-0">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint="product image"
            />
             {product.suitabilityExplanation && (
              <div className="absolute bottom-0 w-full p-2 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p>{product.suitabilityExplanation}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-3 bg-card flex-col items-start">
        <div className="w-full">
            <h3 className="font-semibold text-sm truncate">{product.name}</h3>
            <div className="flex justify-between items-center mt-2">
                <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Like</span>
                </Button>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
