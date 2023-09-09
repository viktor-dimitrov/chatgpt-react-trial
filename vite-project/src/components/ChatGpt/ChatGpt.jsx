
import { useEffect, useState, useRef } from "react";
import { aiServiceFactory } from "../../services/aiService";

import styles from "./ChatGpt.module.css";

export default function ChatGpt({ }) {

    const aiService = aiServiceFactory();

    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {

        if (sectionRef.current) {
            sectionRef.current.scrollTop = sectionRef.current.scrollHeight;
          }

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

    const onPressEnterHandler = (e) => {
        console.log(e.key)
        if (e.key === "Enter") {
            e.preventDefault(); 
            onSubmitHandler(e); 
          }
    }

    
    return (

        <div className={styles['chatGpt-container']}>
            <section ref={sectionRef}>
                {messages.map((message, index) => (
                    <article key={index} className={styles[`${message.role}`]} > <strong>{message.role.toUpperCase()}:</strong> <p> {message.text} </p></article>
                ))}
            </section>

            <form onSubmit={onSubmitHandler} >
              
                    <textarea
                        type="text"
                        name="msg"
                        id="msg"
                        value={inputValue}
                        onChange={onInputValueChange}
                        onKeyDown={onPressEnterHandler}
                    />
                    <input type="submit" value="Send" />
               
            </form>

        </div>
    )
}