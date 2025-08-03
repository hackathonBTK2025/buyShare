"use client";

import { useActionState, useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { Loader2, User, Sparkles } from "lucide-react";
import {
  aiPoweredProductSearch,
  AiPoweredProductSearchInput,
} from "@/ai/flows/ai-powered-product-search";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { products as allProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

type EnrichedProduct = Product & { suitabilityExplanation?: string };

type Message = {
  role: 'user' | 'assistant';
  content: string;
  products?: EnrichedProduct[];
  explanation?: string;
};

type ChatState = {
  messages: Message[];
  error: string | null;
};

// Hook to manage chat history in localStorage
const useChatHistory = () => {
  const [history, setHistory] = useState<Message[][]>([]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load chat history from localStorage", error);
    }
  }, []);

  const addChatToHistory = (chat: Message[]) => {
    const newHistory = [...history, chat];
    setHistory(newHistory);
    try {
      localStorage.setItem('chatHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error("Failed to save chat history to localStorage", error);
    }
  };

  return { history, addChatToHistory };
};

function ChatPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  
  const { addChatToHistory } = useChatHistory();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [state, formAction, isPending] = useActionState<ChatState, FormData>(
    async (prevState, formData) => {
      const currentQuery = formData.get("query") as string;
      if (!currentQuery) return { ...prevState, error: "Please enter a message." };

      const userMessage: Message = { role: 'user', content: currentQuery };
      const newMessages: Message[] = [...prevState.messages, userMessage];

      try {
        const input: AiPoweredProductSearchInput = { query: currentQuery };
        const result = await aiPoweredProductSearch(input);
        
        // Match products from the AI result with the full product data
        const suggestedProducts = result.products
          .map(p => {
            const fullProduct = allProducts.find(ap => ap.id === p.id);
            if (!fullProduct) return null; // Or handle missing products
            return {
              ...fullProduct,
              suitabilityExplanation: p.suitabilityExplanation || ""
            };
          })
          .filter((p): p is EnrichedProduct => p !== null); // Filter out any nulls

        const assistantMessage: Message = {
            role: 'assistant',
            content: result.explanation,
            products: suggestedProducts,
            explanation: result.explanation
        };
        
        const finalMessages = [...newMessages, assistantMessage];
        
        // Don't save empty chats
        if (finalMessages.length > 0) {
            addChatToHistory(finalMessages);
        }

        return { messages: finalMessages, error: null };
      } catch (e: any) {
        const errorMessage: Message = {
            role: 'assistant',
            content: e.message || "An unexpected error occurred."
        };
        return { messages: [...newMessages, errorMessage], error: e.message || "An unexpected error occurred." };
      }
    },
    { messages: [], error: null }
  );
  
  // Effect to run initial search if query param exists
  useEffect(() => {
    if (initialQuery) {
      const formData = new FormData();
      formData.append('query', initialQuery);
      formAction(formData);
    }
  }, [initialQuery]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [state.messages]);


  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-12rem)]">
       <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="container mx-auto py-4 space-y-6">
            {state.messages.length === 0 && !isPending && (
                <div className="text-center text-muted-foreground py-16">
                    <Sparkles className="mx-auto h-12 w-12 text-primary/50" />
                    <h2 className="text-2xl font-semibold mt-4">Start a new chat</h2>
                    <p className="mt-2">Ask me anything about our products!</p>
                </div>
            )}
            {state.messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && (
                        <Avatar className="w-10 h-10 border bg-primary text-primary-foreground">
                            <AvatarFallback><Sparkles className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                    )}
                    <Card className={`max-w-2xl ${message.role === 'user' ? 'bg-primary text-primary-foreground' : ''}`}>
                        <CardContent className="p-4">
                            <p>{message.content}</p>
                            {message.products && message.products.length > 0 && (
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {message.products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                     {message.role === 'user' && (
                        <Avatar className="w-10 h-10 border">
                            <AvatarFallback><User/></AvatarFallback>
                        </Avatar>
                    )}
                </div>
            ))}
             {isPending && (
                <div className="flex items-start gap-4">
                     <Avatar className="w-10 h-10 border bg-primary text-primary-foreground">
                        <AvatarFallback><Sparkles className="h-5 w-5"/></AvatarFallback>
                    </Avatar>
                    <Card className="max-w-2xl">
                        <CardContent className="p-4 flex items-center gap-2 text-muted-foreground">
                           <Loader2 className="animate-spin h-5 w-5" />
                           Thinking...
                        </CardContent>
                    </Card>
                </div>
            )}
            </div>
        </ScrollArea>
       </div>
      <div className="mt-auto pt-4">
         {state.error && <p className="text-destructive text-center text-sm mt-2">{state.error}</p>}
      </div>
    </div>
  );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatPageContent />
        </Suspense>
    )
}
