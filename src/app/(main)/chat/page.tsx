
"use client";

import { useActionState, useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Loader2, User, Sparkles, Send, Mic, Paperclip, X } from "lucide-react";
import {
  aiPoweredProductSearch,
  AiPoweredProductSearchInput,
} from "@/ai/flows/ai-powered-product-search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import { products as allProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

type EnrichedProduct = Product & { suitabilityExplanation?: string };

type Message = {
  role: 'user' | 'assistant';
  content: string;
  imagePreview?: string;
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
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(URL.createObjectURL(file));
        setImageDataUri(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMicClick = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'tr-TR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      toast({ title: "Dinliyorum...", description: "Lütfen şimdi konuşun." });
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      if (inputRef.current) {
        inputRef.current.value = speechResult;
      }
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
        toast({
            variant: "destructive",
            title: "Ses tanıma hatası",
            description: `Bir hata oluştu: ${event.error}`,
        });
        setIsListening(false);
    };

    recognition.start();
  };

  const [state, formAction, isPending] = useActionState<ChatState, FormData>(
    async (prevState, formData) => {
      const currentQuery = formData.get("query") as string;
      if (!currentQuery && !imageDataUri) return { ...prevState, error: "Lütfen bir mesaj girin veya bir görsel seçin." };

      const currentImagePreview = imagePreview;
      const currentImageDataUri = imageDataUri;

      if(inputRef.current) {
        inputRef.current.value = "";
      }
      setImagePreview(null);
      setImageDataUri(null);

      const userMessage: Message = { role: 'user', content: currentQuery, imagePreview: currentImagePreview ?? undefined };
      const newMessages: Message[] = [...prevState.messages, userMessage];

      try {
        const input: AiPoweredProductSearchInput = { query: currentQuery, photoDataUri: currentImageDataUri ?? undefined };
        const result = await aiPoweredProductSearch(input);
        
        let assistantMessage: Message;

        if (result.products && result.products.length > 0) {
            const suggestedProducts = result.products
              .map(p => {
                const fullProduct = allProducts.find(ap => ap.id === p.id);
                if (!fullProduct) return null;
                return {
                  ...fullProduct,
                  suitabilityExplanation: p.suitabilityExplanation || ""
                };
              })
              .filter((p): p is EnrichedProduct => p !== null); 

            assistantMessage = {
                role: 'assistant',
                content: result.explanation,
                products: suggestedProducts,
                explanation: result.explanation
            };
        } else {
             assistantMessage = {
                role: 'assistant',
                content: result.explanation || "Üzgünüm, aramanızla eşleşen bir ürün bulamadım. Lütfen farklı anahtar kelimelerle tekrar deneyin.",
                products: [],
            };
        }
        
        const finalMessages = [...newMessages, assistantMessage];
        
        if (finalMessages.length > 0) {
            addChatToHistory(finalMessages);
        }

        return { messages: finalMessages, error: null };
      } catch (e: any) {
        const errorMessage: Message = {
            role: 'assistant',
            content: e.message || "Beklenmedik bir hata oluştu."
        };
        return { messages: [...newMessages, errorMessage], error: e.message || "Beklenmedik bir hata oluştu." };
      }
    },
    { messages: [], error: null }
  );
  
  useEffect(() => {
    const query = initialQuery;
    if (query) {
      const formData = new FormData();
      formData.append('query', query);
      window.history.replaceState({}, '', '/chat'); 
      formAction(formData);
    }
  }, [initialQuery, formAction]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [state.messages]);


  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
       <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="container mx-auto py-4 space-y-6">
            {state.messages.length === 0 && !isPending && (
                <div className="text-center text-muted-foreground py-16">
                    <Sparkles className="mx-auto h-12 w-12 text-primary/50" />
                    <h2 className="text-2xl font-semibold mt-4">Yeni bir sohbet başlat</h2>
                    <p className="mt-2">Ürünlerimiz hakkında her şeyi bana sor!</p>
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
                            {message.imagePreview && (
                                <div className="relative aspect-square w-48 mb-4">
                                     <Image src={message.imagePreview} alt="User upload preview" fill className="rounded-md object-cover" />
                                </div>
                            )}
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
                           Düşünüyorum...
                        </CardContent>
                    </Card>
                </div>
            )}
            </div>
        </ScrollArea>
       </div>
      <div className="mt-auto pt-4 bg-background">
        <div className="max-w-2xl mx-auto">
            {imagePreview && (
                <div className="relative mb-2 w-24 h-24">
                    <Image src={imagePreview} alt="Preview" fill className="rounded-md object-cover" />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => {
                            setImagePreview(null);
                            setImageDataUri(null);
                            if(fileInputRef.current) fileInputRef.current.value = "";
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            <form action={formAction} className="relative flex items-center gap-2">
                <Input
                    ref={inputRef}
                    name="query"
                    placeholder="Mesajınızı yazın..."
                    className="h-12 flex-grow"
                    disabled={isPending}
                />
                 <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                />
                <Button type="button" size="icon" variant="ghost" onClick={() => fileInputRef.current?.click()} disabled={isPending}>
                    <Paperclip className="h-5 w-5"/>
                </Button>
                 <Button type="button" size="icon" variant={isListening ? 'destructive' : 'ghost'} onClick={handleMicClick} disabled={isPending}>
                    <Mic className="h-5 w-5"/>
                </Button>
                <Button type="submit" size="icon" className="h-9 w-9" disabled={isPending}>
                    <Send className="h-5 w-5"/>
                </Button>
            </form>
         </div>
         {state.error && <p className="text-destructive text-center text-sm mt-2">{state.error}</p>}
      </div>
    </div>
  );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <ChatPageContent />
        </Suspense>
    )
}

    