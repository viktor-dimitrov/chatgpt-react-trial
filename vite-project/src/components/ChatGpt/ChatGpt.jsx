
import { useEffect, useState, useRef } from "react";
import { aiServiceFactory } from "../../services/aiService";

import React from 'react'
import Speech from 'react-text-to-speech'
import moment from "moment";
import monkeyPic from "../../assets/monkey.jpg"
import styles from "./ChatGpt.module.css";

import Loader from "../Loader/Loader";
import ChatForm from "../ChatForm/ChatForm";


export default function ChatGpt({ }) {

    const aiService = aiServiceFactory();
    const date = moment().format("MMM Do YY");
    const hour = moment().format("HH:mm");

    const [messages, setMessages] = useState([{ date: date, hour: hour, role: "bot", text: 'My name is Viktor Dimitroff, what you want to know?' }]);
    const [isLoading, setIsLoading] = useState(false);
    const sectionRef = useRef(null);


    useEffect(() => {

        if (sectionRef.current) {
            sectionRef.current.scrollTop = sectionRef.current.scrollHeight;
        }

    }, [messages])


    const messageHandler = async (message) => {
        setMessages(messages => [...messages, { date: date, hour: hour, role: "user", text: message }]);
        setIsLoading(true);
        const aiResponse = await aiService.send({ message: message });
        setMessages(messages => [...messages, { date: date, hour: hour, role: "bot", text: aiResponse.reply }]);
        setIsLoading(false);
    }


    const startBtn = <button class='my-start-btn'> <i class="fa-solid fa-volume-low"></i> </button>
    const stopBtn = <button class='my-stop-btn'> <i class="fa-solid fa-volume-xmark"></i> </button>


    return (

        <div className={styles['chatGpt-container']}>

            <div className={styles['left']}>
                <div className={styles['img-container']}>
                    <img src={monkeyPic} alt="monkey" />
                </div>
                {isLoading && <div className={styles['loader-container']}> <Loader /> </div>}
            </div>



            <section ref={sectionRef}>

                {messages.map((message, index) => (
                    <div key={index} className={styles[`${message.role}`]}>
                        {message.role === "bot" && (<div className={styles["line"]}> <p>&nbsp;  {message.date} &nbsp;</p> <p className={styles["br"]} ></p> <p>{message.hour}</p> </div>)}
                        <article key={index} className={styles[`${message.role}`]} >
                            <p> {message.text} </p>

                            <div className={styles['speech']}>
                                <Speech text={message.text} startBtn={startBtn} stopBtn={stopBtn} pitch={1} rate={2} />
                            </div>
                        </article>
                        {message.role === "user" && (<div className={styles["line"]}> <p>&nbsp;  {message.date} &nbsp;</p> <p className={styles["br"]} ></p> <p>{message.hour}</p> </div>)}
                    </div>
                ))}

            </section>


            <ChatForm messageHandler={messageHandler} />


        </div>
    )
}