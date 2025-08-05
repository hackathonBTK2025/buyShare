
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Truck } from 'lucide-react';

export default function AddressPage() {
  return (
    <div className="container mx-auto py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Truck className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Teslimat Adresi</h1>
          </div>
          <CardDescription>Siparişinizi nereye göndermemizi istersiniz?</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="fullname">Tam Ad</Label>
              <Input id="fullname" placeholder="Adınız Soyadınız" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address1">Adres Satırı 1</Label>
              <Input id="address1" placeholder="Sokak, Mahalle, Kapı No" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address2">Adres Satırı 2 (İsteğe Bağlı)</Label>
              <Input id="address2" placeholder="Apartman, Daire, Kat vb." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">Şehir</Label>
                <Input id="city" placeholder="İstanbul" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="postal-code">Posta Kodu</Label>
                <Input id="postal-code" placeholder="34000" required />
              </div>
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="phone">Telefon Numarası</Label>
                <Input id="phone" type="tel" placeholder="5XX XXX XX XX" required />
            </div>

            <Separator className="my-4" />

            <Button asChild size="lg" className="w-full">
              <Link href="/checkout/payment">Ödemeye Geç</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
