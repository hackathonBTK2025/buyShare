
"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { User } from '@/lib/types';

interface FollowButtonProps {
    user: User;
    currentUser: User;
}

export function FollowButton({ user, currentUser }: FollowButtonProps) {
    const isInitiallyFollowing = currentUser.followingIds?.includes(user.id);
    const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
    const [isRequestSent, setIsRequestSent] = useState(isInitiallyFollowing);


    const handleFollow = () => {
        setIsRequestSent(true);
    };

    if(isRequestSent) {
        return <Button variant="outline" disabled>İstek Gönderildi</Button>
    }

    if(isFollowing) {
        return <Button variant="outline">Takip Ediliyor</Button>
    }

    return (
        <Button onClick={handleFollow}>Takip Et</Button>
    )
}
