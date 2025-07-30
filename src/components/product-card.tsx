"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Save, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { useCart } from '@/context/cart-context';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint="product image"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold leading-tight mb-1">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <CardDescription className="text-2xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex gap-2">
            <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon">
                <Save className="h-5 w-5" />
                <span className="sr-only">Save</span>
            </Button>
        </div>
        <Button onClick={() => addToCart(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
