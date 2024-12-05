import { Product } from "./product";

// Order interface corresponding to the Go struct
export interface Order {
    order_id: string;   // Primary key
    user_id: string;
    amount: number;
    status: string;
    created_at: string; // string type assuming the date is stored as string
    updated_at: string; // string type assuming the date is stored as string
    order_lists: OrderLists[];
    products: Product[];
}

// OrderLists interface corresponding to the Go struct
interface OrderLists {
    order_list_id: number;  // Primary key
    order_id: string;       // Foreign key to Order
    product_id: string;
    quantity: number;
}