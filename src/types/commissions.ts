// CommissionPost interface
export interface CommissionPost {
    post_id: string;
    title: string;
    description: string;
    price_range_start: number;
    price_range_end: number;
    status: string;
    anime_name: string;
    tag: string;
    created_by: string;
    created_at: string; // ISO 8601 format date string
    updated_at: string; // ISO 8601 format date string
    deleted_at?: string | null; // Optional, ISO 8601 format or null
    custom_ref_images: CommissionPostRefImage[];
}

// CommissionPostRefImage interface
export interface CommissionPostRefImage {
    commission_image_id: number;
    post_id: string;
    image_url: string;
    commission_post?: CommissionPost; // Optional, depending on whether it's included in the response
}