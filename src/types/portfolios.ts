export interface Portfolio {
    portfolio_id: string;
    title: string;
    description: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    portfolio_images: PortfolioImage[];
}

export interface PortfolioImage {
    portfolio_image_id: number;
    portfolio_id: string;
    image_url: string;
    created_at: Date;
    deleted_at: Date;
}