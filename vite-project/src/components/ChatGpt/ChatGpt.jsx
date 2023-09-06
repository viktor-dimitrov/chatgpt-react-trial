
import { useEffect, useState } from "react";
import { aiServiceFactory } from "../../services/aiService";

import styles from "./ChatGpt.module.css";

export default function ChatGpt({ }) {

    const aiService = aiServiceFactory();

    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
     
    }, [messages])


    const onInputValueChange = (e) => {
        setInputValue(e.target.value)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
     
      
        setMessages(messages => [...messages, { role: "user" , text: inputValue}]);
        setInputValue('');
        const aiResponse = await aiService.send({message: inputValue});
        setMessages(messages => [...messages, {role: "bot", text: aiResponse.reply}]);
      
    }

    
    return (

        <div className={styles['chatGpt-container']}>
            <section>
                {messages.map((message, index) => (
                    <p key={index} className={styles[`${message.role}`]} > <strong>{message.role.toUpperCase()}:</strong> {message.text}</p>
                ))}
            </section>

            <form onSubmit={onSubmitHandler} >
              
                    <textarea
                        type="text"
                        name="msg"
                        id="msg"
                        value={inputValue}
                        onChange={onInputValueChange}
                    />
                    <input type="submit" value="Send" />
               
            </form>

        </div>
    )
}