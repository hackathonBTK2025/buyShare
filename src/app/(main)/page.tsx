import { AiChatCard } from '@/components/ai-chat-card';
import { aiChats } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Sana Özel Akış
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Takip ettiğin kişilerin ve topluluğun ürün keşiflerini gör.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {aiChats.map((chat) => (
          <AiChatCard key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
