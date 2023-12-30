import { get, post, put, del } from './requester';

   const url = '/chatroom';


   
export const enterChatRoom = async () => {
    const result = await get(url);
    return result
}
