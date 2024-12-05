import { Portfolio } from "./portfolios";

export interface Profile {
    profile_id: string;
    user_id: string;
    display_name?: string;
    profile_image_url?: string;
    cover_image_url?: string;
    bio?: string;
    gender?: string;
    date_of_birth: string;
    instagram_url?: string;
    twitter_url?: string;
    facebook_url?: string;
    created_at: string;
}

export interface Cosplayer {
    user_id: string;
    username: string;
    display_name?: string;
    first_name: string;
    last_name: string;
    profile_image_url?: string;
    bio?: string;
    interests: string[];
    portfolios: Portfolio[];
    instagram_url?: string;
    twitter_url?: string;
    facebook_url?: string;
    created_at: string;
}