export interface DashboardSlider {
    "id": number,
    "client_id": number,
    "title": string,
    "description": null,
    "url": null,
    "created_at": string,
    "updated_at": string,
    "deleted_at": null,
    "images": Array<SliderImage>
}

export interface SliderImage {
        "id": number,
        "entity_id": number,
        "url": string
}


export interface ArticleDash {
    id: number;
    client_id: number | null;
    slug: string;
    title: string;
    content: string;
    video_link: string | null;
    category_id: number;
    published_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    published_at_formatted: string;
    images: ArticleImage[];
    category: Category;
}

interface ArticleImage {
    id: number;
    entity_id: number;
    url: string;
}

interface Category {
    id: number;
    client_id: number | null;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
