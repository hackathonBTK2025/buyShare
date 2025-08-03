"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Story, User } from '@/lib/types';
import { DialogClose } from './ui/dialog';

interface StoryViewerProps {
    stories: Story[];
    initialUser: User;
    allStories: Story[];
    allUsers: User[];
}

export function StoryViewer({ stories: initialStories, initialUser, allStories, allUsers }: StoryViewerProps) {
    const [currentUserStories, setCurrentUserStories] = useState(initialStories);
    const [currentUser, setCurrentUser] = useState(initialUser);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const orderedUsersWithStories = allUsers.filter(u => u.hasStory);
    const initialUserIndex = orderedUsersWithStories.findIndex(u => u.id === initialUser.id);
    const [currentUserIndex, setCurrentUserIndex] = useState(initialUserIndex);


    const goToNextStory = useCallback(() => {
        setCurrentStoryIndex(prev => {
            if (prev < currentUserStories.length - 1) {
                return prev + 1;
            }
            // Go to next user's stories
            const nextUserIndex = currentUserIndex + 1;
            if (nextUserIndex < orderedUsersWithStories.length) {
                setCurrentUserIndex(nextUserIndex);
            } else {
                // Last user, close dialog or loop
                // For now, let's just stay on the last story
                return prev;
            }
            return 0; // Start of next user's stories
        });
    }, [currentUserStories, currentUserIndex, orderedUsersWithStories.length]);

    const goToPreviousStory = useCallback(() => {
        setCurrentStoryIndex(prev => {
            if (prev > 0) {
                return prev - 1;
            }
            // Go to previous user's stories
            const prevUserIndex = currentUserIndex - 1;
            if (prevUserIndex >= 0) {
                setCurrentUserIndex(prevUserIndex);
                 // We need to set the story index to the end of the previous user's stories
                const prevUser = orderedUsersWithStories[prevUserIndex];
                const prevUserStories = allStories.filter(s => s.userId === prevUser.id);
                return prevUserStories.length - 1;
            }
             // First user, do nothing
            return prev;
        });
    }, [currentUserIndex, orderedUsersWithStories]);

    useEffect(() => {
        const user = orderedUsersWithStories[currentUserIndex];
        if (user) {
            setCurrentUser(user);
            const stories = allStories.filter(s => s.userId === user.id);
            setCurrentUserStories(stories);
            if(currentUserIndex !== initialUserIndex) { // Avoid resetting story index for the initial user
                 setCurrentStoryIndex(0);
            }
        }
    }, [currentUserIndex, allStories, orderedUsersWithStories, initialUserIndex]);

    useEffect(() => {
        setProgress(0);
        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    goToNextStory();
                    return 0;
                }
                return p + (100 / 5000) * 100; // 5s duration
            });
        }, 100);

        return () => clearInterval(timer);
    }, [currentStoryIndex, currentUser.id, goToNextStory]);
    
    useEffect(() => {
        setCurrentStoryIndex(0);
        setProgress(0);
    }, [currentUser.id]);


    const story = currentUserStories[currentStoryIndex];
    if (!story) return null;

    return (
        <div className="relative w-full h-full bg-black flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full p-4 z-10">
                <div className="flex items-center gap-2">
                    {currentUserStories.map((s, index) => (
                        <div key={s.id} className="flex-1 h-1 bg-gray-500/50 rounded-full">
                            <Progress value={index < currentStoryIndex ? 100 : (index === currentStoryIndex ? progress : 0)} className="h-1 bg-white" />
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                     <div className="flex items-center gap-2">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={currentUser.profilePictureUrl} />
                            <AvatarFallback>{currentUser.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-white font-semibold text-sm">{currentUser.username}</span>
                    </div>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                            <X />
                        </Button>
                    </DialogClose>
                </div>
            </div>

            <div className="relative w-full h-full">
                 <Image
                    src={story.imageUrl}
                    alt="Story"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
           
            <div className="absolute inset-0 flex justify-between items-center z-20">
                <button onClick={goToPreviousStory} className="h-full w-1/3" aria-label="Previous Story" />
                <button onClick={goToNextStory} className="h-full w-1/3" aria-label="Next Story" />
            </div>

             <Button onClick={goToPreviousStory} variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white z-30">
                <ChevronLeft/>
            </Button>
             <Button onClick={goToNextStory} variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white z-30">
                <ChevronRight />
            </Button>
        </div>
    );
}
