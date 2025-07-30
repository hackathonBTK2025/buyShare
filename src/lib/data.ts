import type { Product, User, AiChat } from './types';

export const users: User[] = [
  {
    id: 'user1',
    username: 'alex',
    profilePictureUrl: 'https://placehold.co/100x100',
    followerCount: 120,
    followingCount: 75,
  },
  {
    id: 'user2',
    username: 'casey',
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
    queryText: 'Can you suggest some cool, blue jeans for the summer?',
    llmResponseText:
      "Of course! For summer, you'll want jeans made from a lighter denim or a cotton-linen blend to stay cool. Look for styles that are not too tight to allow for better air circulation. Here are a few options that fit your description.",
    productSuggestions: [products[0], products[1]],
    likeCount: 15,
  },
  {
    id: 'chat2',
    user: users[1],
    queryText: "What's a good outfit for a casual weekend brunch?",
    llmResponseText:
      "A great casual brunch outfit combines comfort and style. I'd recommend pairing some light-colored trousers, like our Summer Linen Trousers, with a simple t-shirt or a polo. You could top it off with the Urban Explorer Jacket if it's a bit chilly. This look is effortlessly chic!",
    productSuggestions: [products[1], products[2]],
    likeCount: 22,
  },
];
