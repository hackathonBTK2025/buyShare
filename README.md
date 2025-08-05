![WhatsApp Görsel 2025-08-05 saat 14 16 38_05ff99f5](https://github.com/user-attachments/assets/41e81eda-72dc-410f-b5c3-355687fcd511)
![WhatsApp Görsel 2025-08-05 saat 14 16 56_deb5f197](https://github.com/user-attachments/assets/e7ea2fc7-117c-45af-83ae-0b797a50a758)
![WhatsApp Görsel 2025-08-05 saat 14 18 19_b40d9976](https://github.com/user-attachments/assets/9d828ac9-cc61-402f-86ef-7a412929a52c)
Bu proje, e-ticaret, yapay zeka ve sosyal medya özelliklerini bir araya getirerek, kullanıcılara geleneksel alışveriş deneyimlerinin ötesinde, kişiselleştirilmiş, bilgilendirici ve sosyal bir platform sunmayı amaçlayan yenilikçi bir web uygulamasıdır. Proje, özellikle Firebase Studio platformunda geliştirilmek üzere tasarlanmıştır.

**Projenin Amacı ve Temel Vizyonu**
Projenin temel amacı, mevcut e-ticaret sitelerinin eksikliklerini gidermektir. Geleneksel platformlar genellikle ürün özelliklerini teknik terimlerle veya yüzeysel bilgilerle sunar. Bu proje, bu bilgi boşluğunu doldurarak yapay zeka (LLM) entegrasyonu ile ürünler hakkında daha bağlamsal ve anlaşılır bilgiler sağlamayı hedefler. Aynı zamanda, sosyal medya unsurları ekleyerek ürün keşfini daha organik, etkileşimli ve güvene dayalı hale getirir.

**Hedef Kitle**
Teknoloji Meraklısı Tüketiciler: Yapay zeka ile etkileşime girmeye açık ve yeni alışveriş deneyimlerini benimseyen kullanıcılar.

Bilgiye Aç Tüketiciler: Ürünlerin teknik özelliklerini anlamakta zorlanan ve daha anlaşılır, açıklayıcı bilgilere ihtiyaç duyan bireyler.

Sosyal ve Güven Odaklı Kullanıcılar: Diğer kullanıcılarla fikir alışverişinde bulunmak, yorumları görmek, deneyimlerini paylaşmak ve arkadaş çevresinin alışveriş alışkanlıklarından ilham almak isteyenler.

**Değer Teklifi (Value Proposition)**
Doğal Dil Arama ve Yapay Zeka Danışmanlığı: Kullanıcılar, karmaşık anahtar kelimeler yerine "yazın giyebileceğim serin mavi kot pantolonlar" gibi doğal cümlelerle arama yapabilir. Yapay zeka, bu sorgulara en uygun ürünleri listeler ve ürün hakkında detaylı, anlaşılır bilgiler sunar.

Zengin ve Bağlamsal Ürün Bilgileri: Ürün sayfalarında, teknik özelliklerin yanında, yapay zeka tarafından oluşturulan, kumaş türü, kullanım alanı, mevsimsel uygunluğu gibi bilgileri içeren özetler bulunur.

Sosyal Keşif ve Güven Mekanizması: Kullanıcılar, takip ettikleri kişilerin beğendiği, kaydettiği veya etkileşimde bulunduğu ürünleri ana akışlarında görerek yeni ürünler keşfedebilir. Bu durum, topluluk duygusunu pekiştirir ve alışveriş kararlarını olumlu yönde etkiler.

**Teknik Detaylar ve Mimari**
Proje, hızlı ve ölçeklenebilir bir arka uç için Google Firebase ekosistemini temel alır.

Veritabanı: Firestore NoSQL veritabanı kullanılır. İlişkisel bir yapıdan ziyade, esnek bir koleksiyon-doküman modeli tercih edilmiştir.

Kullanıcılar (users): username, email, passwordHash, profilePictureUrl, followerCount, followingCount gibi alanları içeren bir koleksiyon.

Ürünler (products): name, price, stockQuantity, categoryId, imageUrls, aiSummary (yapay zeka tarafından oluşturulan özet), likeCount gibi alanları içeren ana ürün verileri.

Siparişler (orders): userId, totalAmount, status, shippingAddress gibi verileri tutar. Her siparişin içinde orderItems adında alt koleksiyon veya dizi olabilir.

Yorumlar (comments), Beğeniler (likes), Takipçiler (follows), Sepet (carts): Her biri, kullanıcı ve ürün/içerik arasındaki ilişkileri modelleyen ayrı koleksiyonlar olarak tasarlanmıştır.

**Yapay Zeka Entegrasyonu:**

Projenin ana yapay zeka gücü Google Gemini API'si üzerinden sağlanır.

Kullanıcıların doğal dil aramaları ve ürün hakkında soru-cevap etkileşimleri bu API aracılığıyla gerçekleştirilir.

Gemini API, ürünlerin teknik bilgilerini analiz ederek kullanıcıya özel, anlaşılır özetler (örneğin, "Bu kumaş nefes alır ve yaz aylarında giyilebilir.") oluşturur.

**Arka Uç Fonksiyonları:**

Firebase Authentication kullanıcı kayıt ve giriş işlemlerini yönetir. Google ile hızlı giriş seçeneği sunar.

Firebase Cloud Functions, sunucu tarafı mantık için kullanılır. Örneğin, bir kullanıcı bir ürünü beğendiğinde likeCount değerinin otomatik olarak güncellenmesi veya bir siparişin durumu değiştiğinde bildirim gönderilmesi gibi işlemler burada yönetilir.

Firebase Storage, ürün görselleri ve kullanıcı profil resimleri gibi medya dosyalarını saklamak için kullanılır.

**Ön Yüz Geliştirme:**

Uygulamanın ön yüzü için React veya Next.js gibi modern bir JavaScript framework'ü tercih edilebilir. Bu, hızlı, dinamik ve kullanıcı dostu bir arayüz oluşturmak için idealdir.

Tasarım, mobil öncelikli (responsive design) bir yaklaşımla, her cihazda sorunsuz bir deneyim sağlamak üzere kurgulanır.

**MVP (Minimum Uygulanabilir Ürün) Özellikleri**
Projenin ilk aşaması (MVP), temel işlevselliklere odaklanır:

Kullanıcı Yönetimi: E-posta/şifre ve Google ile hızlı kayıt/giriş sistemi.

Ana Sayfa Akışı: Önceden tanımlanmış veya az sayıda ürün ve yapay zeka sohbet kartlarını içeren basit bir akış.

AI Arama: Doğal dil arama çubuğu ve Gemini API'den metin tabanlı yanıtlar.

Ürün Detay Sayfası: Temel ürün bilgileri (isim, fiyat, görsel) ve yapay zeka tarafından oluşturulmuş kısa bir açıklama.

Basit Sepet: Ürünleri sepete ekleme, sepet içeriğini görüntüleme ve düzenleme.

Temel Sosyal Özellikler: Kullanıcı profili görüntüleme, diğer kullanıcıları takip etme/takibi bırakma ve ürünleri beğenme özelliği.

*Güvenlik ve Ölçeklenebilirlik*
Yapay Zeka Yanıt Kontrolü: Gemini'nin yanlış, zararlı veya yanlı içerik üretmesini engellemek için filtreleme mekanizmaları entegre edilir.

Veri Gizliliği: KVKK ve GDPR gibi ilgili düzenlemelere tam uyum sağlanarak kullanıcı verilerinin korunmasına öncelik verilir.

Altyapı Ölçeklenebilirliği: Firebase'in sunucusuz mimarisi sayesinde, uygulamanın yüksek trafik dönemlerinde dahi performansını koruması ve otomatik olarak ölçeklenmesi sağlanır.

