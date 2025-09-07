import {Message} from '@/model/User'
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    isAcceptingMessage?: boolean;
    messages?: Array<Message>;
    

}