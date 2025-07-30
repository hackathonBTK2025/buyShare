"use client";

import Image from 'next/image';
import { Heart, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { AiChat } from '@/lib/types';

interface AiChatCardProps {
  chat: AiChat;
}

export function AiChatCard({ chat }: AiChatCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src={chat.user.profilePictureUrl} data-ai-hint="person face" />
          <AvatarFallback>{chat.user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{chat.user.username}</p>
          <p className="text-xs text-muted-foreground">asked ShopSocial AI</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          <div className="rounded-xl p-3 bg-muted">
            <p className="font-medium">"{chat.queryText}"</p>
          </div>
          <div className="flex items-start gap-3">
             <div className="rounded-full bg-primary p-2 text-primary-foreground mt-1">
                <MessageSquare className="h-4 w-4" />
             </div>
            <p className="text-sm text-muted-foreground pt-1">{chat.llmResponseText}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-start gap-2 p-4 pt-0">
        <Button variant="ghost" size="sm">
          <Heart className="mr-2 h-4 w-4" /> {chat.likeCount} Likes
        </Button>
      </CardFooter>
    </Card>
  );
}
