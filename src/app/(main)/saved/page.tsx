
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';
import { Bookmark } from 'lucide-react';

export default function SavedPage() {
  // For this prototype, we'll just show a few mock "saved" products.
  // In a real app, you'd fetch this data based on the logged-in user.
  const savedPosts = products.slice(0, 4);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Kaydedilenler</h1>
        <p className="mt-2 text-muted-foreground">
          Daha sonra tekrar göz atmak için kaydettiğin gönderiler.
        </p>
      </div>

      {savedPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedPosts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center justify-center">
            <div className="border-2 border-foreground rounded-full p-6 mb-4">
                 <Bookmark className="h-12 w-12 text-foreground" />
            </div>
          <h2 className="text-2xl font-bold">Henüz Kaydedilen Gönderi Yok</h2>
          <p className="mt-2 text-muted-foreground max-w-sm">
            Bir gönderiyi kaydetmek için altındaki kaydet ikonuna dokun.
          </p>
        </div>
      )}
    </div>
  );
}
