export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  properties: {
    fabric?: string;
    color?: string;
    size?: string;
    material?: string;
  };
  likeCount: number;
  saveCount: number;
}

export interface User {
  id: string;
  username: string;
  profilePictureUrl: string;
  followerCount: number;
  followingCount: number;
}

export interface AiChat {
  id: string;
  user: User;
  userComment: string;
  productSuggestions: Product[];
  likeCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}
