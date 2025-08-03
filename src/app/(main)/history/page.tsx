"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// This should match the type in chat/page.tsx
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<Message[][]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures localStorage is only accessed on the client-side
    setIsClient(true); 
    try {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load chat history from localStorage", error);
    }
  }, []);

  if (!isClient) {
    // Render nothing or a loading spinner on the server
    return null;
  }
  
  if (history.length === 0) {
    return (
      <div className="container mx-auto text-center py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Geçmiş Aramalar</h1>
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <p className="text-xl text-muted-foreground">Geçmiş aramanız bulunmuyor.</p>
            <Button asChild className="mt-4">
                <Link href="/chat">Yeni Sohbet Başlat</Link>
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Geçmiş Aramalar</h1>
      <div className="space-y-4">
        {history.map((chat, index) => {
          const userQuery = chat.find(m => m.role === 'user')?.content;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <p className="font-medium truncate">{userQuery || "Sohbet özeti bulunamadı"}</p>
                </div>
                 {/* This button could link to a detailed view of the chat in the future */}
                <Button variant="ghost" size="icon" disabled>
                    <ChevronRight className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          );
        }).reverse()}
      </div>
    </div>
  );
}
