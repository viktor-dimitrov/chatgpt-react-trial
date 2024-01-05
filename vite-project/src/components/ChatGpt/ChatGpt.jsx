
import { useEffect, useState, useRef } from "react";
import { aiServiceFactory } from "../../services/aiService";

import React from 'react'
import Speech from 'react-text-to-speech'
import moment from "moment";
import monkeyPic from "../../assets/monkey.jpg"
import styles from "./ChatGpt.module.css";

import Loader from "../Loader/Loader";
import ChatForm from "../ChatForm/ChatForm";
import TimeLine from "../TimeLine/TimeLine";


export default function ChatGpt({ }) {

    const aiService = aiServiceFactory();
    const date = moment().format("DD.mm.YY");
    const hour = moment().format("HH:mm");

    const [messages, setMessages] = useState([{ time: {date: date, hour: hour}, role: "bot", text: 'Viktor Dimitroff ordered me to answer you, so ask me whatever you want!' }]);
    const [isLoading, setIsLoading] = useState(false);
    const sectionRef = useRef(null);


    useEffect(() => {

        if (sectionRef.current) {
            sectionRef.current.scrollTop = sectionRef.current.scrollHeight;
        }

    }, [messages])


    const messageHandler = async (message) => {
        setMessages(messages => [...messages, { time:{date: date, hour: hour}, role: "user", text: message }]);
        setIsLoading(true);

        let response = '';
        try{
            const aiResponse = await aiService.send({ message: message });
            response = aiResponse.reply
        }catch(error){
         
            response = `${error.error} `;
        }

        setMessages(messages => [...messages, { time:{date: date, hour: hour}, role: "bot", text: response }]);
        setIsLoading(false);
    }


    const startBtn = <button className='my-start-btn'> <i className="fa-solid fa-volume-low"></i> </button>
    const stopBtn = <button className='my-stop-btn'> <i className="fa-solid fa-volume-xmark"></i> </button>


    return (

        <div className={styles['chatGpt-container']}>





            <section ref={sectionRef}>

            <div className={styles['left']}>
                <div className={styles['img-container']}>
                    <img src={monkeyPic} alt="monkey" />
                      
                {isLoading && <div className={styles['loader-container']}> <Loader /> </div>}
                </div>
            
           
            </div>

                {messages.map((message, index) => (
                    <div key={index} className={styles[`${message.role}`]}>
                        {message.role === "bot" && <TimeLine role={message.role}  time={message.time} /> }
                        <article key={index} className={styles[`${message.role}`]} >
                            <p> {message.text} </p>

                            <div className={styles['speech']}>
                                <Speech text={message.text} startBtn={startBtn} stopBtn={stopBtn} pitch={1} rate={5} />
                            </div>

                        </article>
                        {message.role === "user" && <TimeLine role={message.role} time={message.time} /> }
                    </div>
                ))}
            </section>

            <ChatForm messageHandler={messageHandler} />
   


        </div>
    )
}