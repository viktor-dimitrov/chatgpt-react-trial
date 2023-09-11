
import { useEffect, useState, useRef } from "react";
import { aiServiceFactory } from "../../services/aiService";

import React from 'react'
import Speech from 'react-text-to-speech'
import moment from "moment";
import monkeyPic from "../../assets/monkey.jpg"
import styles from "./ChatGpt.module.css";

import Loader from "../Loader/Loader";


export default function ChatGpt({ }) {

    const aiService = aiServiceFactory();

    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([{role: "bot", text: 'My name is Viktor Dimitroff, what you want to know?'}]);
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
        if (inputValue.length < 2) {
            return
        }
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

    const startBtn = <button class='my-start-btn'> <i class="fa-solid fa-volume-low"></i> </button>
    const stopBtn = <button class='my-stop-btn'> <i class="fa-solid fa-volume-xmark"></i> </button>

    
    return (

        <div className={styles['chatGpt-container']}>

             {console.log(Speech)}
                <div className={styles['left']}>
               
                    <div className={styles['img-container']}>
                       <img src={monkeyPic} alt="monkey" />
                    </div>
                {isLoading &&  <div className={styles['loader-container']}> <Loader/> </div>}
                   
                </div>

           
    
            <section ref={sectionRef}>
      
                {messages.map((message, index) => (
                    <div key={index} className={styles[`${message.role}`]}>
                                 {message.role === "bot" && ( <div className={styles["line"]}> <p>&nbsp;  {date} &nbsp;</p> <p className={styles["br"]} ></p> <p>{hour}</p> </div>)}
                    <article key={index} className={styles[`${message.role}`]} > 
                        <p> {message.text} </p> 
                     
                      
                       <Speech text={message.text} startBtn={startBtn} stopBtn={stopBtn} pitch={1} rate={2}/> 
                        
                       </article>
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