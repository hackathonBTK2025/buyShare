import type { Product, User, AiChat } from './types';

export const users: User[] = [
  {
    id: 'user1',
    username: 'maybeno',
    profilePictureUrl: 'https://firebasestorage.googleapis.com/v0/b/firebase-studio-demos.appspot.com/o/user-dalle.png?alt=media&token=ca334559-9ae6-4ca9-abb3-d3455a29b9b5',
    followerCount: 120,
    followingCount: 75,
  },
  {
    id: 'user0',
    username: 'perisu',
    profilePictureUrl: 'https://placehold.co/100x100',
    followerCount: 180,
    followingCount: 90,
  },
  {
    id: 'user2',
    username: 'henife',
    profilePictureUrl: 'https://placehold.co/100x100',
    followerCount: 250,
    followingCount: 150,
  },
];

export const products: Product[] = [
  {
    id: 'prod1',
    name: 'Klasik Mavi Kot Pantolon',
    description:
      'Zamansız ve çok yönlü bu klasik mavi kot pantolon, gardırobun temel bir parçasıdır. Yüksek kaliteli denimden üretilmiştir, hem konfor hem de dayanıklılık sunar. Her mevsim ve her durum için mükemmeldir.',
    price: 79.99,
    imageUrls: ['https://placehold.co/600x800', 'https://placehold.co/600x800'],
    properties: {
      fabric: '%98 Pamuk, %2 Elastan',
      color: 'Klasik Mavi',
      size: 'W32/L32',
    },
    likeCount: 125,
    saveCount: 42,
  },
  {
    id: 'prod2',
    name: 'Yazlık Keten Pantolon',
    description:
      'Bu hafif keten pantolonlarla serin ve şık kalın. Nefes alabilen kumaşı, sıcak yaz günleri için idealdir ve rahat ama sofistike bir görünüm sağlar.',
    price: 64.5,
    imageUrls: ['https://placehold.co/600x800', 'https://placehold.co/600x800'],
    properties: {
      fabric: '%100 Keten',
      color: 'Bej',
      size: 'Medium',
    },
    likeCount: 210,
    saveCount: 88,
  },
  {
    id: 'prod3',
    name: 'Şehir Kaşifi Ceketi',
    description:
      'Şehir hayatı için tasarlanmış şık ve fonksiyonel bir ceket. Suya dayanıklı ve ceplerle dolu, şehir maceralarınız için mükemmel bir arkadaştır.',
    price: 129.0,
    imageUrls: ['https://placehold.co/600x800'],
    properties: {
      fabric: 'Sentetik Karışım',
      color: 'Zeytin Yeşili',
      size: 'Large',
    },
    likeCount: 340,
    saveCount: 112,
  },
  {
    id: 'prod4',
    name: 'İpek Karışımlı Eşarp',
    description:
      'Bu güzel ipek karışımlı eşarpla her kıyafete zarafet katın. Yumuşak, lüks ve çok yönlü, sayısız şekilde şekillendirilebilir.',
    price: 45.0,
    imageUrls: ['https://placehold.co/600x800'],
    properties: {
      fabric: '%50 İpek, %50 Modal',
      color: 'Çiçek Desenli',
    },
    likeCount: 89,
    saveCount: 21,
  },
];

export const aiChats: AiChat[] = [
  {
    id: 'chat1',
    user: users.find(u => u.id === 'user1')!, 
    userComment: "Bu kot pantolonu yeni aldım ve harika! Süper rahat ve yaz için mükemmel. Yapay zeka mükemmel bedeni bulmama yardımcı oldu.",
    productSuggestions: [products[0]],
    likeCount: 15,
  },
  {
    id: 'chat2',
    user: users[2], // henife
    userComment: "Bu ceketi yapay zeka aramasıyla buldum ve şehir gezilerim için tam da ihtiyacım olan şeydi. Şık ve pratik!",
    productSuggestions: [products[2]],
    likeCount: 22,
  },
  {
    id: 'chat3',
    user: users[1], // perisu
    userComment: "Yapay zeka ile bu ipek eşarbı buldum, tam aradığım gibi!",
    productSuggestions: [products[3]],
    likeCount: 41,
  },
];
