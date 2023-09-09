import { requestFactory } from './requester';

const baseUrl = 'http://localhost:8000/ai';




export const aiServiceFactory = () => {

    const request = requestFactory();

    const send = async (message) => {
        const result = await request.post(baseUrl, message);

        console.log(result);
    
        return result;
    };

    return {
        send
    }


}
