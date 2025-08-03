import type { Product, User, AiChat } from './types';

export const users: User[] = [
  {
    id: 'user1',
    username: 'perisu',
    profilePictureUrl: 'https://placehold.co/100x100',
    followerCount: 120,
    followingCount: 75,
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
    name: 'Classic Blue Jeans',
    description:
      'Timeless and versatile, these classic blue jeans are a wardrobe staple. Made from high-quality denim, they offer both comfort and durability. Perfect for any season and occasion.',
    price: 79.99,
    imageUrls: ['https://placehold.co/600x800', 'https://placehold.co/600x800'],
    properties: {
      fabric: '98% Cotton, 2% Elastane',
      color: 'Classic Blue',
      size: 'W32/L32',
    },
    likeCount: 125,
    saveCount: 42,
  },
  {
    id: 'prod2',
    name: 'Summer Linen Trousers',
    description:
      'Stay cool and stylish with these lightweight linen trousers. Their breathable fabric makes them ideal for warm summer days, providing a relaxed yet sophisticated look.',
    price: 64.5,
    imageUrls: ['https://placehold.co/600x800', 'https://placehold.co/600x800'],
    properties: {
      fabric: '100% Linen',
      color: 'Beige',
      size: 'Medium',
    },
    likeCount: 210,
    saveCount: 88,
  },
  {
    id: 'prod3',
    name: 'Urban Explorer Jacket',
    description:
      'A stylish and functional jacket designed for city life. Water-resistant and packed with pockets, it\'s the perfect companion for your urban adventures.',
    price: 129.0,
    imageUrls: ['https://placehold.co/600x800'],
    properties: {
      fabric: 'Synthetic Blend',
      color: 'Olive Green',
      size: 'Large',
    },
    likeCount: 340,
    saveCount: 112,
  },
  {
    id: 'prod4',
    name: 'Silk Blend Scarf',
    description:
      'Add a touch of elegance to any outfit with this beautiful silk blend scarf. Soft, luxurious, and versatile, it can be styled in numerous ways.',
    price: 45.0,
    imageUrls: ['https://placehold.co/600x800'],
    properties: {
      fabric: '50% Silk, 50% Modal',
      color: 'Floral Print',
    },
    likeCount: 89,
    saveCount: 21,
  },
];

export const aiChats: AiChat[] = [
  {
    id: 'chat1',
    user: users[0],
    userComment: "Just got these jeans and they're amazing! Super comfortable and perfect for summer. AI helped me find the perfect fit.",
    productSuggestions: [products[0]],
    likeCount: 15,
  },
  {
    id: 'chat2',
    user: users[1],
    userComment: "Found this jacket through the AI search and it's exactly what I needed for my city trips. Stylish and practical!",
    productSuggestions: [products[2]],
    likeCount: 22,
  },
];
