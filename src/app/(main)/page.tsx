import { AiChatCard } from '@/components/ai-chat-card';
import { StoryReel } from '@/components/story-reel';
import { SuggestionCard } from '@/components/suggestion-card';
import { aiChats, users } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto py-8">
      <div className="md:col-span-2 space-y-8">
        <StoryReel users={users} />
        <div className="space-y-8 max-w-xl mx-auto">
           {aiChats.map((chat) => (
            <AiChatCard key={chat.id} chat={chat} />
          ))}
        </div>
      </div>
      <div className="hidden md:block md:col-span-1">
        <SuggestionCard />
      </div>
    </div>
  );
}
