
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Heart, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product & { suitabilityExplanation?: string };
  onRemove?: (productId: string) => void;
}

export function ProductCard({ product, onRemove }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card link navigation
    setIsLiked(!isLiked);
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card link navigation
    if (onRemove) {
      onRemove(product.id);
    }
  };

  return (
    <Card className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative">
      {onRemove && (
         <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 z-10 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <Link href={`/product/${product.id}`}>
        <CardContent className="p-0">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint="product"
            />
             {product.suitabilityExplanation && (
              <div className="absolute bottom-0 w-full p-2 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p>{product.suitabilityExplanation}</p>
              </div>
            )}
             {product.aiSummary && !product.suitabilityExplanation && (
              <div className="absolute bottom-0 w-full p-2 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p>{product.aiSummary}</p>
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
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleLike}>
                    <Heart className={cn("h-4 w-4", isLiked && "text-red-500 fill-red-500")} />
                    <span className="sr-only">Beğen</span>
                </Button>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
