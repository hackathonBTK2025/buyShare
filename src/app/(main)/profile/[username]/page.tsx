import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Heart, Save, Settings } from 'lucide-react';
import { users, products } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProfilePage({ params }: { params: { username: string } }) {
  const isOwnProfile = params.username === 'me';
  const user = isOwnProfile
    ? users[0]
    : users.find((u) => u.username === params.username);

  if (!user) {
    notFound();
  }

  // Mock liked and saved products
  const likedProducts = [products[0], products[2]];
  const savedProducts = [products[1], products[3]];

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8 relative">
        <Avatar className="h-32 w-32 border-4 border-card">
          <AvatarImage src={user.profilePictureUrl} data-ai-hint="person face" />
          <AvatarFallback className="text-4xl">
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <h1 className="text-4xl font-bold">{user.username}</h1>
            {!isOwnProfile && <Button>Takip Et</Button>}
          </div>
          <div className="flex justify-center md:justify-start gap-6 my-4 text-muted-foreground">
            <div>
              <span className="font-bold text-foreground">{likedProducts.length}</span> gönderi
            </div>
            <div>
              <span className="font-bold text-foreground">{user.followerCount}</span> Takipçi
            </div>
            <div>
              <span className="font-bold text-foreground">{user.followingCount}</span> Takip
            </div>
          </div>
        </div>
        {isOwnProfile && (
            <div className="absolute top-0 right-0">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <Settings className="h-6 w-6" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profili Düzenle</DropdownMenuItem>
                    <DropdownMenuItem>Engellenenler</DropdownMenuItem>
                    <DropdownMenuItem>Ayarlar</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )}
      </div>

      <Tabs defaultValue="liked" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="liked">
            <Heart className="mr-2 h-4 w-4" /> Beğenilenler
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Save className="mr-2 h-4 w-4" /> Kaydedilenler
          </TabsTrigger>
        </TabsList>
        <TabsContent value="liked" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {likedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
