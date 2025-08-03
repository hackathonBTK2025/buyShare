"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { AiChat } from '@/lib/types';
import { ProductCard } from './product-card';

interface AiChatCardProps {
  chat: AiChat;
}

export function AiChatCard({ chat }: AiChatCardProps) {
  const product = chat.productSuggestions[0]; // Assuming one product per post for now

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Link href={`/profile/${chat.user.username}`} className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={chat.user.profilePictureUrl} data-ai-hint="person face" />
              <AvatarFallback>{chat.user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{chat.user.username}</p>
              <p className="text-xs text-muted-foreground">bir ürün paylaştı</p>
            </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="italic mb-4">"{chat.userComment}"</p>
        {product && (
            <ProductCard product={product} />
        )}
      </CardContent>
      <CardFooter className="flex justify-start gap-2 p-4 pt-0">
        <Button variant="ghost" size="sm">
          <Heart className="mr-2 h-4 w-4" /> {chat.likeCount}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" /> Yorum yap
        </Button>
      </CardFooter>
    </Card>
  );
}
