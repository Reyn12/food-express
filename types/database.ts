// types/database.ts
export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    is_available: boolean;
    location: string;
    delivery_time: number;
    created_at: string;
  }
  
  export interface User {
    id: string;
    email: string;
    full_name: string;
    phone: string;
    address: string;
    created_at: string;
  }
  
  export interface Order {
    id: string;
    user_id: string;
    food_item_id: string;
    quantity: number;
    total_price: number;
    delivery_address: string;
    status: string;
    created_at: string;
  }