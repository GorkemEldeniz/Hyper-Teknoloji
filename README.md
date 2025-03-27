# HyperTeknoloji - Front-End Teknik Test Projesi

Bu proje, HyperTeknoloji'nin Front-End Developer adayları için oluşturulmuş teknik değerlendirme projesidir. Next.js App Router, TypeScript ve modern web teknolojileri kullanılarak geliştirilen e-ticaret arayüzü.

## Teknik Mimari

### Teknoloji Stack'i

- **Next.js 15** (App Router) - Server Component'ler, Route Handler'lar ve Paralel Route'lar
- **TypeScript** - Tip güvenliği ve kod kalitesi
- **React 19** - Server ve Client Component'ler
- **Tailwind CSS** - Utility-first yaklaşımla responsive tasarım

### Klasör Yapısı

```
/src
  /app                     # Next.js App Router yapısı
    /(protect)             # Korumalı route'lar
      /payment             # Ödeme sayfası
      /products            # Ürün listeleme
      /product             # Ürün detay
      layout.tsx           # Korumalı route'lar layoutu (sepet provider içerir)
    /api                   # API route'ları
    layout.tsx             # Ana layout
    not-found.tsx          # 404 sayfası
  /components              # Yeniden kullanılabilir bileşenler
    /ui                    # Temel UI bileşenleri (Shadcn)
    /payment               # Ödeme formu bileşenleri
    /products              # Ürün listesi bileşenleri
    /product               # Ürün detay bileşenleri
    /cart                  # Sepet bileşenleri
  /lib                     # Yardımcı fonksiyonlar ve servisler
    /context               # React Context'ler
      cart-provider.tsx    # Sepet state yönetimi
    /zod                   # Zod şemaları (form validasyonları)
    /utils                 # Genel yardımcı fonksiyonlar
  /types                   # TypeScript tip tanımlamaları
```

## Route Yapısı ve Sayfa Mimarisi

### Ana Route'lar

- `/` - Ana sayfa
- `/products` - Tüm ürünlerin listelendiği sayfa
- `/products?category=...` - Kategoriye göre filtrelenmiş ürün listesi
- `/product/[id]` - Ürün detay sayfası
- `/payment` - Ödeme işlem sayfası
- `/api/*` - Backend servisleri yerine mocklanmış API'lar

### Mimari Yaklaşım

- **Layout Katmanlama**: Ortak UI elementleri için nested layout'lar
- **React Server Components (RSC)**: Mümkün olduğunca Server Component kullanımı
- **Isomorphic Rendering**: Statik (Static) ve dinamik (Dynamic) render stratejilerinin kombinasyonu

## Uygulamanın Teknik Özellikleri

### State Yönetimi

- **React Context**: `CartProvider` ile sepet durumu yönetimi
- **localStorage**: Sepet persistance (kullanıcı sayfayı yenilediğinde verilerin korunması)
- **Server State**: Data fetching için Next.js patterns
- **Form State**: React Hook Form ile form durumları

### UI/UX İmplementasyonu

- **Komponentizasyon**: Yeniden kullanılabilir ve izole edilmiş bileşenler
- **Responsive Tasarım**: Tailwind breakpoint'leri ile tüm cihazlarda tutarlı deneyim
- **Tema Desteği**: next-themes ile karanlık/aydınlık tema geçişi
- **Micro Interactions**: Toast bildirimleri, loading states, hover efektleri

### Veri Validasyonu

- **İstemci Tarafı Validasyon**: Zod şemaları ile form doğrulama
- **Özel Input Bileşenleri**: Kredi kartı numarası formatlama (her 4 hanede `-`)
- **Son Kullanma Tarihi Formatı**: Otomatik `AA/YY` formatlama

## Özel Bileşen Özellikleri

### Kredi Kartı Formu

- **CreditCardInput**: Otomatik format ve validasyon
- **CardExpirationInput**: Akıllı tarih formatlama
- **Animasyonlu Toast**: İşlem bildirimleri için özel toast mesajları

### Sepet İşlevleri

- **CartContext**: React Context API kullanımı
- **localStorage Entegrasyonu**: Tarayıcı yenilemelerinde veri korunması
- **Ürün Miktarı Yönetimi**: İnteraktif miktar artırma/azaltma

### Not Found Sayfası

- **Özelleştirilmiş 404**: Kullanıcı deneyimi için özel tasarlanmış hata sayfası
- **Navigasyon Alternatifleri**: Kullanıcıya farklı navigasyon seçenekleri sunma

## Kurulum ve Geliştirme

### Gereksinimler

- Node.js 18.0 veya üzeri
- npm, yarn veya pnpm

### Kurulum Adımları

1. Repoyu klonlayın:

```bash
git clone https://github.com/your-username/hyper-teknoloji.git
cd hyper-teknoloji
```

2. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. Environment Değişkenlerini Oluşturun:

Projenin ana dizininde `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

````bash
# JWT secret key oluştur
JWT_SECRET=your_secret_key

4. Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
````

5. Test için kullanabileceğiniz özellikler:
   - Ürün listeleme ve filtreleme
   - Sepete ürün ekleme/çıkarma
   - Ödeme formu validasyonları
   - Tema değiştirme
   - Toast bildirimleri

---

**Not**: Bu proje HyperTeknoloji Front-End Developer değerlendirmesi için oluşturulmuştur. Gerçek bir e-ticaret sistemi için ek güvenlik ve backend entegrasyonları gereklidir.
