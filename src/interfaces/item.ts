export interface Item {
    id?: string;
    name: string;
    description: string;
    image_url: File;
    price: number;
    status: string;
    schedule: string;
    reclaimable: boolean;
    isVisible: boolean;
}