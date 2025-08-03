import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

export default function ExplorePage() {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Keşfet</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Yeni trendleri, popüler ürünleri ve sana özel önerileri keşfet.
        </p>
      </div>

      <div className="grid grid-cols-3 grid-rows-auto gap-1">
        {products.map((product, index) => {
          const isLarge = index % 5 === 0;
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className={cn(
                'group relative aspect-square overflow-hidden rounded-md shadow-lg',
                {
                  'col-span-2 row-span-2': isLarge,
                  'col-span-1 row-span-1': !isLarge,
                }
              )}
            >
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                fill
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                data-ai-hint="product image"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Heart className="h-6 w-6" />
                        <span>{product.likeCount}</span>
                    </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
