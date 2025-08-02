import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <div className="relative bg-card text-card-foreground rounded-lg overflow-hidden mb-8 shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://placehold.co/1200x400')" }}
          data-ai-hint="fashion store"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 p-12 lg:p-24 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Discover Your Style
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Explore our curated collection of high-quality apparel and accessories.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/search">Start Exploring</Link>
          </Button>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
