
"use client"

import Image from 'next/image';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send } from 'lucide-react';

const mockConversations = [
  {
    user: users[1],
    messages: [
      { from: 'them', text: 'Hey, did you see the new jacket on the explore page?' },
      { from: 'me', text: 'Oh yeah, the olive green one? Looks amazing!' },
      { from: 'them', text: 'Totally! I think I\'m gonna get it.' },
      { from: 'me', text: 'You should! It would look great on you.' },
    ],
    lastMessage: 'You should! It would look great on you.',
    time: '10m',
  },
  {
    user: { id: 'user3', username: 'ayse', profilePictureUrl: 'https://placehold.co/100x100', followerCount: 300, followingCount: 200 },
    lastMessage: 'Let\'s catch up tomorrow!',
    time: '1h',
    messages: [],
  },
];

export default function MessagesPage() {
  const selectedConversation = mockConversations[0];

  return (
    <Card className="h-full w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 shadow-none border-0 md:border md:shadow-sm">
      {/* Conversation List */}
      <div className="flex flex-col border-r h-full col-span-1">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-grow">
          <div className="divide-y">
            {mockConversations.map((convo) => (
              <div
                key={convo.user.id}
                className="p-4 flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={convo.user.profilePictureUrl} alt={convo.user.username} />
                  <AvatarFallback>{convo.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden">
                  <p className="font-semibold truncate">{convo.user.username}</p>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                <span className="text-xs text-muted-foreground">{convo.time}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Panel */}
      <div className="hidden md:flex flex-col h-full col-span-2 lg:col-span-3">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b flex items-center gap-4">
               <Avatar>
                  <AvatarImage src={selectedConversation.user.profilePictureUrl} alt={selectedConversation.user.username} />
                  <AvatarFallback>{selectedConversation.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{selectedConversation.user.username}</h2>
            </div>
            <ScrollArea className="flex-grow p-4 space-y-4 bg-muted/20">
              {selectedConversation.messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${
                      msg.from === 'me'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-card border rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 border-t bg-background">
                <div className="relative">
                    <Input placeholder="Type a message..." className="pr-12 h-12" />
                    <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9">
                        <Send className="h-5 w-5"/>
                    </Button>
                </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-center">
            <div>
              <Send className="h-16 w-16 text-muted-foreground mx-auto" />
              <h2 className="text-2xl font-bold mt-4">Your Messages</h2>
              <p className="text-muted-foreground">Send private photos and messages to a friend.</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
