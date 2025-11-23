// Types para Emagrify Store

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  variations?: ProductVariation[];
  tags?: string[];
  featured?: boolean;
}

export interface ProductVariation {
  id: string;
  name: string;
  options: string[];
  priceModifier?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  role: 'customer' | 'admin';
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  variation?: Record<string, string>;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  pointsUsed: number;
  pointsEarned: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minPurchase?: number;
  expiresAt?: Date;
}

export interface TimelinePost {
  id: string;
  title: string;
  content: string;
  images?: string[];
  link?: string;
  createdAt: Date;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  messages: TicketMessage[];
  createdAt: Date;
}

export interface TicketMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  isAdmin: boolean;
  createdAt: Date;
}
