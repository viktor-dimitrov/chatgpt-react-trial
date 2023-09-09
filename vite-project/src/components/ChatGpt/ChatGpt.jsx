
import { useEffect, useState, useRef } from "react";
import { aiServiceFactory } from "../../services/aiService";

import styles from "./ChatGpt.module.css";

export default function ChatGpt({ }) {

    const aiService = aiServiceFactory();

    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([{role: "bot", text: 'Good Day Commander'}]);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        const aiResponse = await aiService.send({message: inputValue});
        setMessages(messages => [...messages, {role: "bot", text: aiResponse.reply}]);
        setIsLoading(false);
    }

    const onPressEnterHandler = (e) => {
        if (e.key === "Enter") {
            onSubmitHandler(e); 
          }
    }

    
    return (

        <div className={styles['chatGpt-container']}>

             <header></header>
    
            <section ref={sectionRef}>
                {messages.map((message, index) => (
                    <div className={styles[`${message.role}`]}>
                                 {message.role === "bot" && ( <div className={styles["line"]}><p>time</p></div>)}
                    <article key={index} className={styles[`${message.role}`]} >  <p> {message.text} </p></article>
                                {message.role === "user" && ( <div className={styles["line"]}> <p>time</p> </div>)}
                    </div>
                ))}
              {isLoading &&  <h1>Loading...</h1>}
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