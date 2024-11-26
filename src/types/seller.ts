export interface Seller {
    seller_id: string;
    user_id: string;
    shop_type: string;
    shop_name: string;
    shop_desc: string;
    profile_image_url: string;
    verify: boolean;
    accept_credit_card: boolean;
    accept_qr_promptpay: boolean;
    external_link: string;
    bank_name: string;
    bank_account_number: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
    seller_username: string;
  }