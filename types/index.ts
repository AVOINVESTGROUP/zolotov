export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  count: number;
}

export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  status: string;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  images: ProductImage[];
  categories: { id: number; name: string; slug: string }[];
  attributes: ProductAttribute[];
  related_ids: number[];
  upsell_ids: number[];
  meta_data: { id: number; key: string; value: any }[];
}

export interface CartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

export interface Order {
  id: number;
  status: string;
  currency: string;
  total: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  line_items: {
    product_id: number;
    quantity: number;
  }[];
}
