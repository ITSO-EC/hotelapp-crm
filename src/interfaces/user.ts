export interface User { 
    id: string,
    name: string,
    email: string,
    role: string,
    phoneNumber: string,
    isEmailVerified?: boolean,
    allowPushNotifications?: boolean,
    allowWhatsappMessages?: boolean,
    allowQualify?: boolean,
    createdAt?: string,
    updatedAt?: string,
}