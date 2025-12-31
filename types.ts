
export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  price: string;
  pricingType: 'one-time' | 'subscription' | 'usage';
  image: string;
  images: string[];
  rating: number;
  features: string[];
  vendorName: string;
  vendorRating: number;
}

export interface VendorLogo {
  id: string;
  name: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  date: string;
  image: string;
}

export interface BantResponse {
  budget: string;
  authority: string;
  need: string;
  timeline: string;
}

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  intentScore: number;
  bantStatus: 'qualified' | 'partial' | 'unqualified';
  summary: string;
}