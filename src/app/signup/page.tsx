
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
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
import { Flame } from 'lucide-react';
import { users } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const validatePassword = (password: string): string | null => {
        if (password.length < 4) {
            return "Şifre en az 4 karakter uzunluğunda olmalıdır.";
        }
        if (!/\d/.test(password)) {
            return "Şifre en az bir sayı içermelidir.";
        }
        if (!/[a-zA-Z]/.test(password)) {
            return "Şifre en az bir harf içermelidir.";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "Şifre en az bir özel karakter içermelidir.";
        }
        return null;
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
            setError('Bu kullanıcı adı zaten alınmış.');
            return;
        }

        // In a real app, you would handle the user creation here.
        console.log('User created:', { email, fullname, username });

        toast({
            title: 'Hesap Oluşturuldu!',
            description: 'Giriş sayfasına yönlendiriliyorsunuz.',
        });

        router.push('/login');
    };

    const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Google</title>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.98-4.66 1.98-3.55 0-6.43-2.91-6.43-6.48s2.88-6.48 6.43-6.48c2.03 0 3.36.85 4.17 1.62l2.55-2.55C18.03 2.05 15.84 1 12.48 1 7.22 1 3.2 4.9 3.2 10.08s4.02 9.08 9.28 9.08c2.93 0 5.4-1 7.1-2.76.9-1 .9-2.2.9-3.62 0-.6-.05-1.1-.1-1.66h-7.6z" />
    </svg>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <Link href="/" className="flex items-center gap-2 font-semibold justify-center mb-4">
                <Flame className="h-8 w-8 text-primary" />
                <span className="text-2xl">TrendAI</span>
            </Link>
          <CardTitle className="text-2xl">Kaydol</CardTitle>
          <CardDescription>
            Arkadaşlarının fotoğraflarını ve videolarını görmek için kaydol.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <Button variant="outline" className="w-full">
                <GoogleIcon className="mr-2 h-4 w-4" />
                Google ile Giriş Yap
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

                <div className="grid gap-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input id="email" type="email" placeholder="E-posta" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="fullname">Ad Soyad</Label>
                    <Input id="fullname" type="text" placeholder="Ad Soyad" required value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="username">Kullanıcı Adı</Label>
                    <Input id="username" type="text" placeholder="Kullanıcı Adı" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Şifre</Label>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Şifreyi Onayla</Label>
                    <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                
                {error && <p className="text-destructive text-sm text-center">{error}</p>}

                <p className="px-2 text-center text-xs text-muted-foreground">
                    Hizmetimizi kullanan kişiler bilgilerini Instagram'a yüklemiş olabilir.
                    <Link href="#" className="underline underline-offset-2">Daha Fazla Bilgi Al</Link>
                </p>
                 <p className="px-2 text-center text-xs text-muted-foreground">
                    Kaydolarak, <Link href="#" className="underline underline-offset-2">Koşullarımızı</Link>, <Link href="#" className="underline underline-offset-2">Gizlilik İlkemizi</Link> ve <Link href="#" className="underline underline-offset-2">Çerezler İlkemizi</Link> kabul etmiş olursun.
                </p>
                <Button type="submit" className="w-full">
                Kaydol
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Hesabın var mı?{' '}
                <Link href="/login" className="underline">
                Giriş yap
                </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
