import { User } from "~~/interfaces/user"

export interface Session {
    authToken?: string;
    user?: User
}