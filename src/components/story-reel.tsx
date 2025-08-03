"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const StoryCircle = ({ user }: { user: User }) => (
  <Link href={`/profile/${user.username}`} className="flex flex-col items-center gap-2 flex-shrink-0">
    <div className="relative h-20 w-20 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
      <div className="p-0.5 bg-background rounded-full h-full w-full">
         <Avatar className="h-full w-full">
            <AvatarImage src={user.profilePictureUrl} alt={user.username} data-ai-hint="person face" />
            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
    <span className="text-xs font-medium truncate">{user.username}</span>
  </Link>
);


export function StoryReel({ users }: { users: User[] }) {
    return (
        <div className="p-4">
            <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-2 -mb-2">
                {users.map(user => (
                    <StoryCircle key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}
