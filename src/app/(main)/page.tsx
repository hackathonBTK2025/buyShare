import { AiChatCard } from '@/components/ai-chat-card';
import { StoryReel } from '@/components/story-reel';
import { aiChats, users } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <StoryReel users={users} />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Akış
        </h2>
        <p className="text-muted-foreground">
          Takip ettiğin kişilerin ve topluluğun ürün keşiflerini gör.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiChats.map((chat) => (
          <AiChatCard key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
