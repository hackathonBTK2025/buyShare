
"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { User, Story } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { StoryViewer } from './story-viewer';

const StoryCircle = ({ user, stories, allUsers }: { user: User; stories: Story[], allUsers: User[] }) => {
    const userStories = stories.filter(s => s.userId === user.id);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex flex-col items-center gap-2 flex-shrink-0 w-20">
                    <div className="relative h-20 w-20 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                        <div className="p-0.5 bg-background rounded-full h-full w-full">
                            <Avatar className="h-full w-full">
                                <AvatarImage src={user.profilePictureUrl} alt={user.username} data-ai-hint="person" />
                                <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <span className="text-xs font-medium truncate w-full">{user.username}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="p-0 m-0 bg-black border-0 max-w-full h-screen sm:h-[95vh] sm:max-w-md sm:rounded-lg overflow-hidden">
                <StoryViewer stories={userStories} initialUser={user} allStories={stories} allUsers={allUsers} />
            </DialogContent>
        </Dialog>
    );
};

export function StoryReel({ users, stories, allUsers }: { users: User[]; stories: Story[], allUsers: User[] }) {
    return (
        <div className="p-4">
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 -mb-2">
                {users.map(user => (
                    <StoryCircle key={user.id} user={user} stories={stories} allUsers={allUsers} />
                ))}
            </div>
        </div>
    );
}

    