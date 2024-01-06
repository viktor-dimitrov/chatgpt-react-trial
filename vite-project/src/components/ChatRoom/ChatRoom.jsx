import io from 'socket.io-client';
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { enterChatRoom } from "../../services/chatService";

import Message from "../Message/Message";
import ChatForm from '../ChatForm/ChatForm';

import styles from "./ChatRoom.module.css";



Modal.setAppElement('#root');
// 
const socket = io('http://localhost:3000');

export default function ChatRoom () {

   

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [username, setUsername] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(true);
  
    useEffect(() => {
     
        
      socket.on('reciveMessage', handleNewMessage);
  

      return (
        ()=> {  socket.on('disconnect', () => {
         
          });}
      )

      
    }, []);

    const messageHandler = async(message)=> {
      console.log(messages);
      socket.emit('sendMessage', {username:'Uzer', text: message });
      setMessageText('');
    }
  
    const sendMessage = () => {
      const newMessage = { text: messageText }; 
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('sendMessage', { text: messageText });
      setMessageText('');
     
    };

    const handleNewMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      const handleEnterChat = () => {
        setModalIsOpen(false);
        // Добави логика, ако е необходимо, след влизане в чата
      };


    return(
        <div className={styles['chat-container']}>
        <h1>Real-Time Chat App</h1>
        <div className="messages">
          {messages.map((message, index) => (
            <Message key={index} username={message.username} text={message.text} />
          ))}
        </div>

        {modalIsOpen && (
        <Modal
         isOpen={modalIsOpen} 
         contentLabel="Enter Chat"
         className={styles['modal-container']}
         
         >
          <h2>Enter Chat</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <button onClick={handleEnterChat}>Enter</button>
        </Modal>
      )}


          <ChatForm  messageHandler={messageHandler}/>

      </div>
    )


}