export interface Room {
    id?: string;
    name: string;
    description: string;
    imagesUrl?: File[];
    users?: string[];
    number: number;
    wifiData?: string,
    doorKey?: string,
    checkOutTime?: string,
    createdAt?: string,
    updatedAt?: string,
    
}