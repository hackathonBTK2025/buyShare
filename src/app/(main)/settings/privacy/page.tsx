
import Link from 'next/link';
import {
  Users,
  Lock,
  Star,
  UserPlus,
  MessageSquare,
  Tag,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


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

export default function SettingsPrivacyPage() {
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
                        item.href.includes('/privacy') && 'bg-muted text-primary'
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
                <CardTitle>Hesap Gizliliği</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                        <Label htmlFor="private-account" className="font-semibold text-base">Gizli Hesap</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                            Bu seçenek etkinken, sadece takip ettiğin kişiler gönderilerini ve hikayelerini görebilir.
                        </p>
                    </div>
                    <Switch id="private-account" />
                </div>
                 <Separator />
                 <div>
                    <h3 className="text-lg font-semibold mb-4">Diğer Gizlilik Ayarları</h3>
                     <div className="space-y-4">
                        <Link href="#" className="flex justify-between items-center p-3 hover:bg-muted rounded-md">
                            <span>Yorumlar</span>
                            <ChevronRight className="h-5 w-5 text-muted-foreground"/>
                        </Link>
                         <Link href="#" className="flex justify-between items-center p-3 hover:bg-muted rounded-md">
                            <span>Etiketler ve Bahsetmeler</span>
                            <ChevronRight className="h-5 w-5 text-muted-foreground"/>
                        </Link>
                         <Link href="#" className="flex justify-between items-center p-3 hover:bg-muted rounded-md">
                            <span>Engellenen Hesaplar</span>
                            <ChevronRight className="h-5 w-5 text-muted-foreground"/>
                        </Link>
                     </div>
                 </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

// Dummy ChevronRight icon for placeholder
const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

