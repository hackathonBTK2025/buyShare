import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { products } from '@/lib/data';
import { generateProductSummary } from '@/ai/flows/product-information-summary';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { ProductActionButtons } from '@/components/product-action-buttons';
import { Star } from 'lucide-react';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const { summary } = await generateProductSummary({
    productName: product.name,
    productDescription: product.description,
    productFeatures: `Fabric: ${product.properties.fabric}, Color: ${product.properties.color}`,
  });

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.imageUrls.map((url, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={url}
                      alt={`${product.name} resim ${index + 1}`}
                      fill
                      className="object-cover"
                      data-ai-hint="lifestyle"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                    ))}
                </div>
                <p className="text-sm text-muted-foreground">123 Yorum</p>
            </div>
          </div>
          
          <div className="p-4 bg-card rounded-lg border">
            <h2 className="text-lg font-semibold mb-2 text-primary flex items-center gap-2">
                <CheckCircle className="w-5 h-5"/>
                Yapay Zeka Özeti
            </h2>
            <p className="text-muted-foreground">{product.aiSummary || summary}</p>
          </div>

          <div>
            <p className="text-4xl font-extrabold text-primary">${product.price.toFixed(2)}</p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-2">Detaylar</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {product.properties.fabric && <li>Kumaş: {product.properties.fabric}</li>}
                {product.properties.color && <li>Renk: {product.properties.color}</li>}
                {product.properties.size && <li>Beden: {product.properties.size}</li>}
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} />
            <ProductActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
