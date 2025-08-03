
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageSquare, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { AiChat } from '@/lib/types';
import { ProductCard } from './product-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { users } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


interface AiChatCardProps {
  chat: AiChat;
}

export function AiChatCard({ chat }: AiChatCardProps) {
  const product = chat.productSuggestions[0]; // Assuming one product per post for now

  // Mock data for likers - in a real app this would come from props or a hook
  const likers = users.slice(0, Math.min(users.length, chat.likeCount));

  return (
    <Card className="shadow-none border-b rounded-none flex flex-col bg-transparent">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Link href={`/profile/${chat.user.username}`} className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={chat.user.profilePictureUrl} data-ai-hint="person face" />
              <AvatarFallback>{chat.user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="font-semibold">{chat.user.username}</p>
        </Link>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Takibi Bırak</DropdownMenuItem>
                <DropdownMenuItem>Gönderiye git</DropdownMenuItem>
                <DropdownMenuItem>Hesap hakkında</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        {product && (
            <div className="relative aspect-square">
                 <Image
                    src={product.imageUrls[0]}
                    alt={product.name}
                    fill
                    className="object-cover w-full h-full rounded-md border"
                    data-ai-hint="product image"
                />
            </div>
        )}
      </CardContent>
       <CardFooter className="flex flex-col items-start p-4 gap-2">
        <div className="flex justify-start gap-2">
            <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                <Heart className="h-6 w-6" />
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

            <Button variant="ghost" size="icon">
            <MessageSquare className="h-6 w-6" />
            </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="text-foreground font-semibold p-0 h-auto">
                {chat.likeCount} beğenme
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
         <p>
            <Link href={`/profile/${chat.user.username}`} className="font-semibold hover:underline">{chat.user.username}</Link>
            <span className="ml-2">{chat.userComment}</span>
         </p>
          <Button variant="link" className="text-muted-foreground p-0 h-auto text-sm">
            22 yorumun tümünü gör
          </Button>
      </CardFooter>
    </Card>
  );
}
