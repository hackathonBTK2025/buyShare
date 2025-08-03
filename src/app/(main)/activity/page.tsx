

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { users } from '@/lib/data';
import { UserPlus, Heart, MessageSquare } from 'lucide-react';

const followRequests = [
    {
        id: 1,
        type: 'follow_request',
        user: { id: 'user3', username: 'ahmet', profilePictureUrl: 'https://placehold.co/100x100', followerCount: 0, followingCount: 0 },
        text: 'sizi takip etmek istiyor.',
        time: '2s',
    },
    {
        id: 4,
        type: 'follow_request',
        user: { id: 'user4', username: 'zeynep', profilePictureUrl: 'https://placehold.co/100x100', followerCount: 0, followingCount: 0 },
        text: 'sizi takip etmek istiyor.',
        time: '3g',
    },
];

const thisWeekNotifications = [
     {
        id: 2,
        type: 'like',
        user: users[1], // henife
        text: 'gönderini beğendi.',
        time: '5s',
        postPreview: 'https://placehold.co/600x800'
    },
     {
        id: 5,
        type: 'like',
        user: { id: 'user5', username: 'mehmet', profilePictureUrl: 'https://placehold.co/100x100', followerCount: 0, followingCount: 0 },
        text: 'gönderini beğendi.',
        time: '1h',
        postPreview: 'https://placehold.co/600x800'
    },
];

const thisMonthNotifications = [
    {
        id: 3,
        type: 'comment',
        user: users[0], // perisu
        text: 'gönderine yorum yaptı: "Harika görünüyor!"',
        time: '1g',
        postPreview: 'https://placehold.co/600x800'
    },
]


const NotificationIcon = ({ type }: { type: string }) => {
    const iconStyle = "h-6 w-6";
    switch (type) {
        case 'follow_request':
            return <UserPlus className={iconStyle} />;
        case 'like':
            return <Heart className={iconStyle} />;
        case 'comment':
            return <MessageSquare className={iconStyle} />;
        default:
            return null;
    }
}

const NotificationItem = ({ notification }: { notification: any }) => (
    <div key={notification.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
        <NotificationIcon type={notification.type} />
        <Avatar className="h-12 w-12">
            <AvatarImage src={notification.user.profilePictureUrl} alt={notification.user.username} data-ai-hint="person face" />
            <AvatarFallback>{notification.user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
            <p>
                <span className="font-semibold">{notification.user.username}</span>
                {' '}
                {notification.text}
            </p>
            <p className="text-xs text-muted-foreground">{notification.time}</p>
        </div>
        {notification.type === 'follow_request' && (
            <div className="flex gap-2">
                <Button size="sm">Kabul Et</Button>
                <Button size="sm" variant="outline">Reddet</Button>
            </div>
        )}
        {notification.postPreview && (
            <Image
                src={notification.postPreview}
                alt="Post preview"
                width={56}
                height={56}
                className="rounded-md object-cover"
                data-ai-hint="product image"
            />
        )}
    </div>
);


export default function ActivityPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Hareketlerin</h1>
      <div className="space-y-8">
        {followRequests.length > 0 && (
            <div>
                <h2 className="text-lg font-semibold px-4 mb-2">Takip İstekleri</h2>
                <Card>
                    <CardContent className="p-0">
                        <div className="divide-y">
                           {followRequests.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}

        {thisWeekNotifications.length > 0 && (
            <div>
                <h2 className="text-lg font-semibold px-4 mb-2">Bu Hafta</h2>
                <Card>
                    <CardContent className="p-0">
                        <div className="divide-y">
                           {thisWeekNotifications.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}

        {thisMonthNotifications.length > 0 && (
            <div>
                <h2 className="text-lg font-semibold px-4 mb-2">Bu Ay</h2>
                <Card>
                    <CardContent className="p-0">
                        <div className="divide-y">
                           {thisMonthNotifications.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}
      </div>
    </div>
  );
}
