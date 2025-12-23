
export interface Product {
  id: string;
  name: string;
  category: 'fish' | 'plants' | 'tanks' | 'equipment';
  price: number;
  image: string;
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  thumbnail: string;
  title: string;
  url: string;
}

// Fix: Added ChatMessage interface to resolve "Module '"../types"' has no exported member 'ChatMessage'" errors
export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type View = 'home' | 'shop';
