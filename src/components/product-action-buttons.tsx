"use client";

import { useState } from 'react';
import { Heart, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ProductActionButtons() {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    return (
        <>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={cn("mr-2 h-4 w-4", isLiked && "text-red-500 fill-red-500")} /> Beğen
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsSaved(!isSaved)}>
                <Save className={cn("mr-2 h-4 w-4", isSaved && "fill-foreground")} /> Kaydet
            </Button>
        </>
    )
}
