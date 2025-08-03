"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { AiChat } from '@/lib/types';
import { ProductCard } from './product-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { users } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AiChatCardProps {
  chat: AiChat;
}

export function AiChatCard({ chat }: AiChatCardProps) {
  const product = chat.productSuggestions[0]; // Assuming one product per post for now

  // Mock data for likers - in a real app this would come from props or a hook
  const likers = users.slice(0, Math.min(users.length, chat.likeCount));

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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Heart className="mr-2 h-4 w-4" /> {chat.likeCount}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Beğenenler</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
                <div className="space-y-4 pr-4">
                {likers.map((user) => (
                    <div key={user.id} className="flex items-center gap-4">
                        <Link href={`/profile/${user.username}`}>
                            <Avatar>
                                <AvatarImage src={user.profilePictureUrl} data-ai-hint="person face" />
                                <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="flex-grow">
                           <Link href={`/profile/${user.username}`} className="font-semibold hover:underline">
                             {user.username}
                           </Link>
                        </div>
                        <Button size="sm" variant={user.id === 'user1' ? 'outline' : 'default'}>
                            {user.id === 'user1' ? 'Takip ediliyor' : 'Takip Et'}
                        </Button>
                    </div>
                ))}
                </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" /> Yorum yap
        </Button>
      </CardFooter>
    </Card>
  );
}
