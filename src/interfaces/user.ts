export interface User { 
    id?: string,
    name: string,
    email: string,
    role: string,
    phoneNumber: string,
    room?: string,
    password?:string,
    file?: string[],
    imageUrl?: string[],
    isEmailVerified?: boolean,
    allowPushNotifications?: boolean,
    allowWhatsappMessages?: boolean,
    allowQualify?: boolean,
    createdAt?: string,
    updatedAt?: string,
}