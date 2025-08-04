
'use client';

import { useState, useEffect, useCallback } from 'react';
import { StoryReel } from '@/components/story-reel';
import { SuggestionCard } from '@/components/suggestion-card';
import { AiChatCard } from '@/components/ai-chat-card';
import { aiChats as allAiChats, users, stories } from '@/lib/data';
import type { User, Story, AiChat } from '@/lib/types';
import { Loader2 } from 'lucide-react';

// Helper to shuffle array and get new items
const getNewChats = (existingIds: Set<string>): AiChat[] => {
    const availableChats = allAiChats.filter(p => !existingIds.has(p.id));
    if (availableChats.length === 0) {
        // If all chats are shown, start repeating them but shuffle to look fresh
        return [...allAiChats].sort(() => 0.5 - Math.random()).slice(0, 2);
    }
    return availableChats.sort(() => 0.5 - Math.random()).slice(0, 2);
};


export default function HomePage() {
  const [chats, setChats] = useState<AiChat[]>(allAiChats.slice(0, 2));
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = users.find(u => u.id === 'user1') as User;
  const followingIds = currentUser.followingIds || [];

  const storiesUsers = users.filter(user => (followingIds.includes(user.id) || user.id === currentUser.id) && user.hasStory);
  const userStories = stories.filter(story => storiesUsers.some(u => u.id === story.userId));

  const loadMoreChats = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
        const existingIds = new Set(chats.map(p => p.id));
        const newChats = getNewChats(existingIds);

        // Add a unique key for repeated products to avoid React key issues
        const newChatsWithUniqueKeys = newChats.map(p => ({
            ...p,
            uniqueId: `${p.id}-${Date.now()}-${Math.random()}`
        }));

        // @ts-ignore
        setChats(prev => [...prev, ...newChatsWithUniqueKeys]);
        setIsLoading(false);
    }, 500);
  }, [isLoading, chats]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user is near the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMoreChats();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreChats]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto py-8">
      <div className="md:col-span-2 space-y-8">
        <StoryReel users={storiesUsers} stories={userStories} allUsers={users} />
        <div className="space-y-8 max-w-xl mx-auto">
           {chats.map((chat) => {
             // @ts-ignore
             const key = chat.uniqueId || chat.id;
             return <AiChatCard key={key} chat={chat} />
            })}
             {isLoading && (
                <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}
        </div>
      </div>
      <div className="hidden md:block md:col-span-1">
        <SuggestionCard />
      </div>
    </div>
  );
}
