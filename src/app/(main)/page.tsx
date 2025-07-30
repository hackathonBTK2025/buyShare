import { ProductCard } from '@/components/product-card';
import { AiChatCard } from '@/components/ai-chat-card';
import { products, aiChats } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">For You</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Interleave products and AI chats for a dynamic feed */}
        <ProductCard product={products[0]} />
        <AiChatCard chat={aiChats[0]} />
        <ProductCard product={products[1]} />
        <ProductCard product={products[2]} />
        <AiChatCard chat={aiChats[1]} />
        <ProductCard product={products[3]} />
      </div>
    </div>
  );
}
