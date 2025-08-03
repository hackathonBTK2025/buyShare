
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Flame, Lock } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4 rounded-full border-2 border-foreground h-20 w-20 flex items-center justify-center">
                <Lock className="h-10 w-10 text-foreground" />
            </div>
          <CardTitle className="text-xl">Giriş Yaparken Sorun mu Yaşıyorsun?</CardTitle>
          <CardDescription>
            E-posta adresini, telefon numaranı veya kullanıcı adını gir ve hesabına yeniden girebilmen için sana bir bağlantı gönderelim.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="login"
                type="text"
                placeholder="E-posta, Telefon veya Kullanıcı Adı"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Giriş Bağlantısı Gönder
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    VEYA
                    </span>
                </div>
            </div>
            <Button variant="link" asChild className="text-foreground font-semibold">
                <Link href="/signup">Yeni Hesap Oluştur</Link>
            </Button>
          </div>
          <div className="mt-4 text-center">
            <Button variant="link" asChild className="font-bold">
                 <Link href="/login">Giriş Ekranına Geri Dön</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
