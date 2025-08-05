
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the payment here.
    toast({
      title: 'Ödeme Başarılı!',
      description: 'Siparişiniz alındı. Ana sayfaya yönlendiriliyorsunuz.',
    });
    // Here you would also clear the cart.
    router.push('/');
  };

  return (
    <div className="container mx-auto py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Ödeme Bilgileri</h1>
          </div>
          <CardDescription>Lütfen güvenli ödeme için kart bilgilerinizi girin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="card-name">Kart Üzerindeki İsim</Label>
              <Input id="card-name" placeholder="Ad Soyad" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="card-number">Kart Numarası</Label>
              <Input id="card-number" placeholder="0000 0000 0000 0000" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry-date">Son Kullanma Tarihi</Label>
                <Input id="expiry-date" placeholder="AA/YY" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" required />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full mt-4">
              Ödemeyi Tamamla ve Siparişi Ver
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
