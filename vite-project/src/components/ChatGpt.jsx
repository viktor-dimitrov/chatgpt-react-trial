
import { useEffect, useState } from "react";
import { aiServiceFactory } from "../services/aiService";

export default function ChatGpt({ }) {

    const aiService = aiServiceFactory();

    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log(messages);
    }, [messages])


    const onInputValueChange = (e) => {
        setInputValue(e.target.value)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
     
      
        setMessages(messages => [...messages, inputValue]);
        setInputValue('');
        const aiResponse = await aiService.send({message: inputValue});
        setMessages(messages => [...messages, aiResponse.reply]);
      
    }

    
    return (

        <div>
            <section>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </section>

            <form onSubmit={onSubmitHandler} >
                <div>
                    <input
                        type="text"
                        name="msg"
                        id="msg"
                        value={inputValue}
                        onChange={onInputValueChange}
                    />
                    <input type="submit" value="Send" />
                </div>
            </form>

        </div>
    )
}