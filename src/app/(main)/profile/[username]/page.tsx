
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Grid3x3, Heart, Save, Settings, UserPlus, Bell, Lock, Star } from 'lucide-react';
import { users, products, aiChats } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function ProfilePage({ params }: { params: { username: string } }) {
  const isOwnProfile = params.username === 'me' || params.username === 'maybeno';
  const user = isOwnProfile
    ? users.find(u => u.id === 'user1')
    : users.find((u) => u.username === params.username);

  if (!user) {
    notFound();
  }

  // Mock user's posts
  const userPosts = aiChats
    .filter((chat) => chat.user.id === user.id)
    .flatMap((chat) => chat.productSuggestions);
    
  // Mock followers: find users who are following the current user.
  // In a real app, this would be a database query.
  const followers = users.filter(u => u.followingIds?.includes(user.id));
  const following = users.filter(u => user.followingIds?.includes(u.id));

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8 relative">
        <Avatar className="h-40 w-40 border-4 border-card">
          <AvatarImage src={user.profilePictureUrl} data-ai-hint="person face" />
          <AvatarFallback className="text-4xl">
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <h1 className="text-4xl font-bold">{user.username}</h1>
            {!isOwnProfile && <Button>Takip Et</Button>}
             {isOwnProfile && (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Profili Düzenle</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl h-[90vh]">
                        <DialogHeader>
                            <DialogTitle className="text-center text-xl">Profili Düzenle</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-full w-full">
                          <Card className="border-0 shadow-none">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-6 mb-8">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={user.profilePictureUrl} data-ai-hint="person face" />
                                        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="text-xl font-semibold">{user.username}</h2>
                                        <p className="text-sm text-muted-foreground">{user.bio}</p>
                                    </div>
                                    <Button variant="outline" className="ml-auto">Fotoğrafı Değiştir</Button>
                                </div>

                                <form className="space-y-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="website">İnternet sitesi</Label>
                                        <Input id="website" placeholder="İnternet sitesi" />
                                        <p className="text-xs text-muted-foreground">
                                            Bağlantılarını sadece mobil cihazlarda düzenleyebilirsin. Biyografindeki internet sitelerini değiştirmek için Instagram uygulamasını ziyaret et ve profilini düzenle.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Biyografi</Label>
                                        <Textarea id="bio" defaultValue={user.bio} maxLength={150} />
                                        <p className="text-xs text-muted-foreground text-right">
                                          {user.bio?.length || 0} / 150
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Cinsiyet</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Söylememeyi tercih ederim" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Erkek</SelectItem>
                                                <SelectItem value="female">Kadın</SelectItem>
                                                <SelectItem value="prefer-not-to-say">Söylememeyi tercih ederim</SelectItem>
                                                <SelectItem value="custom">Özel</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-muted-foreground">
                                          Bu, herkese açık profilinin parçası olmayacak.
                                        </p>
                                    </div>

                                    <Separator />
                                    
                                    <div className="flex items-center justify-between p-4 rounded-lg border">
                                      <div>
                                            <Label htmlFor="show-suggestions" className="font-semibold">Profillerde hesap önerilerini göster</Label>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                İnsanların senin profilinde benzer hesap önerileri görüp göremeyeceğini seç.
                                            </p>
                                      </div>
                                      <Switch id="show-suggestions" />
                                    </div>

                                    <DialogFooter>
                                        <DialogClose asChild>
                                          <div className="flex justify-end gap-2">
                                              <Button type="button" variant="ghost">İptal</Button>
                                              <Button type="submit">Kaydet</Button>
                                          </div>
                                        </DialogClose>
                                    </DialogFooter>
                                </form>
                            </CardContent>
                          </Card>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
             )}
          </div>
          {user.bio && <p className="mt-4 text-muted-foreground text-center md:text-left">{user.bio}</p>}
          <div className="flex justify-center md:justify-start gap-6 my-4 text-muted-foreground">
            <div>
              <span className="font-bold text-foreground">{userPosts.length}</span> gönderi
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:underline">
                  <span className="font-bold text-foreground">{followers.length}</span> Takipçi
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Takipçiler</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh]">
                  <div className="space-y-4 pr-4">
                    {followers.map((u) => (
                      <div key={u.id} className="flex items-center gap-4">
                        <Link href={`/profile/${u.username}`}>
                          <Avatar>
                            <AvatarImage src={u.profilePictureUrl} data-ai-hint="person face" />
                            <AvatarFallback>{u.username.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </Link>
                        <div className="flex-grow">
                          <Link href={`/profile/${u.username}`} className="font-semibold hover:underline">
                            {u.username}
                          </Link>
                        </div>
                        {isOwnProfile && <Button size="sm" variant="outline">Kaldır</Button>}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:underline">
                  <span className="font-bold text-foreground">{following.length}</span> Takip
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Takip Edilenler</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh]">
                  <div className="space-y-4 pr-4">
                    {following.map((u) => (
                      <div key={u.id} className="flex items-center gap-4">
                        <Link href={`/profile/${u.username}`}>
                          <Avatar>
                            <AvatarImage src={u.profilePictureUrl} data-ai-hint="person face" />
                            <AvatarFallback>{u.username.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </Link>
                        <div className="flex-grow">
                          <Link href={`/profile/${u.username}`} className="font-semibold hover:underline">
                            {u.username}
                          </Link>
                        </div>
                        {isOwnProfile && <Button size="sm" variant="outline">Takibi Bırak</Button>}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
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

      <Separator />

      <div className="mt-8">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground mb-6">
              <Grid3x3 className="h-4 w-4" />
              <span>GÖNDERİLER</span>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userPosts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {userPosts.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <p className="text-xl text-muted-foreground">Henüz gönderi yok.</p>
            </div>
        )}
      </div>
    </div>
  );
}

// Add separator to avoid duplicate import error
import { Separator } from '@/components/ui/separator';
