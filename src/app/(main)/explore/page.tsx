import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';

export default function ExplorePage() {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Keşfet
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Yeni trendleri ve popüler ürünleri keşfedin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
