export interface Product {
  product_id: string;
  seller_id: string;
  name: string;
  price: number;
  quantity: number;
  rent: boolean;
  rent_deposit: number;
  rent_return_date: string;
  description: string;
  category: string;
  condition: string;
  size: string;
  region: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  product_images: ProductImage[];
}

export interface ProductImage {
  product_image_id: number;
  product_id: string;
  image_url: string;
}
