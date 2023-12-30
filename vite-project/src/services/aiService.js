import { get, post, put, del } from './requester';

   const url = '/chatgpt';

//  const baseUrl ='https://capricious-diagnostic-crepe.glitch.me/ai';




export const aiServiceFactory = () => {

    const send = async (message) => {
        const result = await post(url, message);

        console.log(result);
    
        return result;
    };

    return {
        send
    }


}

