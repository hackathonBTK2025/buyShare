import { StoryReel } from '@/components/story-reel';
import { SuggestionCard } from '@/components/suggestion-card';
import { AiChatCard } from '@/components/ai-chat-card';
import { aiChats, users, stories } from '@/lib/data';
import type { User, Story } from '@/lib/types';

export default function HomePage() {
  const currentUser = users.find(u => u.id === 'user1') as User;
  const followingIds = currentUser.followingIds || [];

  const storiesUsers = users.filter(user => (followingIds.includes(user.id) || user.id === currentUser.id) && user.hasStory);
  const userStories = stories.filter(story => storiesUsers.some(u => u.id === story.userId));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto py-8">
      <div className="md:col-span-2 space-y-8">
        <StoryReel users={storiesUsers} stories={userStories} allUsers={users} />
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
