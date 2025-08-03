import { AiChatCard } from '@/components/ai-chat-card';
import { StoryReel } from '@/components/story-reel';
import { aiChats, users } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Sana Özel Akış
        </h1>
        <p className="text-lg text-muted-foreground">
          Takip ettiğin kişilerin ve topluluğun ürün keşiflerini gör.
        </p>
      </div>

      <div className="mb-8">
        <StoryReel users={users} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiChats.map((chat) => (
          <AiChatCard key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
