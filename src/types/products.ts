export interface Product {
    product_id: string;
    name: string;
    price: number;
    quantity: number;
    rent: boolean;
    rent_deposit: number;
    rent_return_date: string; // Use string to represent time (ISO format) in JS/TS
    description: string;
    category: string;
    condition: string;
    size: string;
    region: string;
    created_by: string;
    created_at: string; // Same as above for timestamp
    updated_at: string; // Same as above for timestamp
    deleted_at?: string | null; // Nullable, depending on whether the record is deleted or not
    product_images: ProductImage[];
  }
  
  export interface ProductImage {
    product_image_id: number;
    product_id: string;
    image_url: string;
  }
  