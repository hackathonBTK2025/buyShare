import { AiChatCard } from '@/components/ai-chat-card';
import { aiChats } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          See what others are finding
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore a feed of AI-powered product discoveries from our community.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {aiChats.map((chat) => (
          <AiChatCard key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
