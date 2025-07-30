"use client";

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/types';

interface AddToCartButtonProps {
    product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    
    return (
        <Button size="lg" className="w-full sm:w-auto flex-grow" onClick={() => addToCart(product)}>
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
        </Button>
    )
}
