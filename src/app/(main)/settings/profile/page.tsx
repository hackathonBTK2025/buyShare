
import Link from 'next/link';
import {
  Users,
  Bell,
  Lock,
  Star,
  Shield,
  Palette,
  MessageCircle,
  BarChart,
  UserPlus,
  MessageSquare,
  AtSign,
  Tag,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { users } from '@/lib/data';
import { cn } from '@/lib/utils';

const sidebarNavItems = [
    {
      title: 'Profili düzenle',
      icon: Users,
      href: '/settings/profile',
    },
     {
      title: 'Hesap gizliliği',
      icon: Lock,
      href: '/settings/privacy',
    },
    {
      title: 'Yakın Arkadaşlar',
      icon: Star,
      href: '#', // Placeholder
    },
     {
      title: 'Engellenenler',
      icon: UserPlus,
      href: '#', // Placeholder
    },
    {
        title: 'Yorumlar',
        icon: MessageSquare,
        href: '#', // Placeholder
    },
    {
        title: 'Etiketler ve Bahsetmeler',
        icon: Tag,
        href: '#', // Placeholder
    },
]

export default function SettingsProfilePage() {
   const user = users.find(u => u.id === 'user1');

   if (!user) return null;

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <aside className="md:col-span-1">
          <h1 className="text-2xl font-bold mb-6">Ayarlar</h1>
           <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-lg">Hesaplar Merkezi</CardTitle>
                    <CardDescription>
                        Meta teknolojileri arasındaki bağlantılı deneyimlerini ve hesap ayarlarını yönet.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-blue-400">
                    <p><Link href="#" className="hover:underline">Kişisel detaylar</Link></p>
                    <p><Link href="#" className="hover:underline">Şifre ve güvenlik</Link></p>
                    <p><Link href="#" className="hover:underline">Reklam tercihleri</Link></p>
                </CardContent>
            </Card>

            <nav className="space-y-1">
                {sidebarNavItems.map((item) => (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        // This is a placeholder for active state, will need usePathname
                        item.href.includes('/profile') && 'bg-muted text-primary'
                    )}
                    >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                    </Link>
                ))}
            </nav>
            <Separator className="my-4" />
             <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Dil: Türkçe" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="tr">Türkçe</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                </SelectContent>
            </Select>
        </aside>

        {/* Right Content */}
        <main className="md:col-span-3">
          <Card>
             <CardHeader>
                <CardTitle>Profili düzenle</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
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

                     <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost">İptal</Button>
                        <Button type="submit">Kaydet</Button>
                    </div>
                </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
