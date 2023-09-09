
import { useEffect, useState, useRef } from "react";
import { aiServiceFactory } from "../../services/aiService";
import moment from "moment";
import monkeyPic from "../../assets/monkey.jpg"
import styles from "./ChatGpt.module.css";

import Loader from "../Loader/Loader";

export default function ChatGpt({ }) {

    const aiService = aiServiceFactory();

    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([{role: "bot", text: 'Good Day Commander'}]);
    const [isLoading, setIsLoading] = useState(false);
    const sectionRef = useRef(null);
    const date = moment().format("MMM Do YY");
    const hour = moment().format("HH:mm");

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

             
                <div className={styles['left']}>
               
                    <div className={styles['img-container']}>
                       <img src={monkeyPic} alt="monkey" />
                    </div>
                {isLoading &&  <div className={styles['loader-container']}> <Loader/> </div>}
                   
                </div>

           
    
            <section ref={sectionRef}>
      
                {messages.map((message, index) => (
                    <div className={styles[`${message.role}`]}>
                                 {message.role === "bot" && ( <div className={styles["line"]}> <p>&nbsp;  {date} &nbsp;</p> <p className={styles["br"]} ></p> <p>{hour}</p> </div>)}
                    <article key={index} className={styles[`${message.role}`]} >  <p> {message.text} </p></article>
                                {message.role === "user" && ( <div className={styles["line"]}> <p>&nbsp;  {date} &nbsp;</p> <p className={styles["br"]} ></p> <p>{hour}</p> </div>)}
                    </div>
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