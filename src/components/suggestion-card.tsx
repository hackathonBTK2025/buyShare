
"use client";

import Link from 'next/link';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';

export function SuggestionCard() {
    const currentUser = users.find(u => u.id === 'user1') as User;
    const followingIds = currentUser.followingIds || [];

    const suggestions = users.filter(u => u.id !== currentUser.id && !followingIds.includes(u.id)).slice(0, 5);

  return (
    <div className="p-4 space-y-4 sticky top-8">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-muted-foreground">Senin için önerilenler</h3>
        <Button variant="link" size="sm" className="text-foreground">
          Tümünü Gör
        </Button>
      </div>

      <div className="space-y-3">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center gap-4">
            <Link href={`/profile/${user.username}`}>
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profilePictureUrl} data-ai-hint="person face" />
                <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-grow">
              <Link href={`/profile/${user.username}`} className="font-semibold text-sm hover:underline">
                {user.username}
              </Link>
              <p className="text-xs text-muted-foreground">Sizin için öneriliyor</p>
            </div>
            <Button variant="link" size="sm" className="text-blue-500">
              Takip Et
            </Button>
          </div>
        ))}
      </div>
       <footer className="text-xs text-muted-foreground pt-8">
        <div className="flex flex-wrap gap-x-2">
            <Link href="#" className="hover:underline">Hakkında</Link>
            <Link href="#" className="hover:underline">Yardım</Link>
            <Link href="#" className="hover:underline">Basın</Link>
            <Link href="#" className="hover:underline">API</Link>
            <Link href="#" className="hover:underline">İş Fırsatları</Link>
            <Link href="#" className="hover:underline">Gizlilik</Link>
            <Link href="#" className="hover:underline">Koşullar</Link>
            <Link href="#" className="hover:underline">Konumlar</Link>
            <Link href="#" className="hover:underline">Dil</Link>
            <Link href="#" className="hover:underline">Meta Verified</Link>
        </div>
        <p className="mt-4">&copy; 2024 TRENDAI FROM STUDIO</p>
      </footer>
    </div>
  );
}
