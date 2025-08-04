
"use client"

import { useState } from 'react';
import Image from 'next/image';
import { users as allUsers } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, SquarePen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { User } from '@/lib/types';
import Link from 'next/link';

interface Message {
  from: 'me' | 'them';
  text: string;
}

interface Conversation {
  user: User;
  messages: Message[];
  lastMessage: string;
  time: string;
}

const initialConversations: Conversation[] = [
  {
    user: allUsers[1], // henife
    messages: [
      { from: 'them', text: 'Selam, keşfet sayfasındaki yeni ceketi gördün mü?' },
      { from: 'me', text: 'Evet, o zeytin yeşili olan mı? Harika görünüyor!' },
      { from: 'them', text: 'Kesinlikle! Sanırım alacağım.' },
      { from: 'me', text: 'Almalısın! Sana çok yakışır.' },
    ],
    lastMessage: 'Almalısın! Sana çok yakışır.',
    time: '10d',
  },
  {
    user: { id: 'user3', username: 'ayse', profilePictureUrl: 'https://placehold.co/100x100', followerCount: 300, followingCount: 200, hasStory: false },
    lastMessage: 'Yarın görüşelim!',
    time: '1s',
    messages: [
       { from: 'them', text: 'Yarın görüşelim!' }
    ],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0] || null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = { from: 'me', text: newMessage };

    const updatedConversation: Conversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      time: 'Şimdi'
    };

    const updatedConversations = conversations.map(c =>
      c.user.id === selectedConversation.user.id ? updatedConversation : c
    );

    setConversations(updatedConversations);
    setSelectedConversation(updatedConversation);
    setNewMessage('');
  };

  const startNewConversation = (user: User) => {
    // Check if conversation already exists
    const existingConvo = conversations.find(c => c.user.id === user.id);
    if (existingConvo) {
      setSelectedConversation(existingConvo);
      return;
    }
    // Create a new one
    const newConvo: Conversation = {
      user,
      messages: [],
      lastMessage: 'Yeni sohbet başlatıldı',
      time: 'Şimdi'
    };
    setConversations([newConvo, ...conversations]);
    setSelectedConversation(newConvo);
  };
  
  const filteredUsers = allUsers.filter(user => user.id !== 'user1' && user.username.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <Card className="h-full w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 shadow-none border-0 md:border md:shadow-sm">
      {/* Conversation List */}
      <div className="flex flex-col border-r h-full col-span-1">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
             <h1 className="text-2xl font-bold">Mesajlar</h1>
              <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <SquarePen className="h-6 w-6" />
                    </Button>
                </DialogTrigger>
                 <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Yeni Mesaj</DialogTitle>
                    </DialogHeader>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Kullanıcı ara..." 
                            className="pl-8" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <ScrollArea className="max-h-[60vh]">
                        <div className="space-y-2 pr-4">
                            {filteredUsers.map(user => (
                               <DialogTrigger asChild key={user.id}>
                                    <div 
                                        className="flex items-center gap-4 p-2 rounded-md hover:bg-muted cursor-pointer"
                                        onClick={() => startNewConversation(user)}
                                    >
                                        <Avatar>
                                            <AvatarImage src={user.profilePictureUrl} />
                                            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <p className="font-semibold">{user.username}</p>
                                    </div>
                                </DialogTrigger>
                            ))}
                        </div>
                    </ScrollArea>
                 </DialogContent>
              </Dialog>
          </div>
          <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Mesajlarda ara..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-grow">
          <div className="divide-y">
            {conversations.map((convo) => (
              <div
                key={convo.user.id}
                className={`p-4 flex items-center gap-4 cursor-pointer transition-colors ${selectedConversation?.user.id === convo.user.id ? 'bg-muted' : 'hover:bg-muted/50'}`}
                onClick={() => setSelectedConversation(convo)}
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
                <form onSubmit={handleSendMessage} className="relative">
                    <Input 
                        placeholder="Bir mesaj yaz..." 
                        className="pr-12 h-12" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9">
                        <Send className="h-5 w-5"/>
                    </Button>
                </form>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-center">
            <div>
              <Send className="h-16 w-16 text-muted-foreground mx-auto" />
              <h2 className="text-2xl font-bold mt-4">Mesajların</h2>
              <p className="text-muted-foreground">Bir arkadaşına özel fotoğraf ve mesaj gönder.</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
