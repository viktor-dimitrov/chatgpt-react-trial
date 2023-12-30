import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { enterChatRoom } from "../../services/chatService";

import Message from "../Message/Message";



// 
const socket = io('http://localhost:3000');

export default function ChatRoom () {

   

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
  
    useEffect(() => {
     
        
      socket.on('reciveMessage', handleNewMessage);
  

      return (
        ()=> {  socket.on('disconnect', () => {
         
          });}
      )

      
    }, []);
  
    const sendMessage = () => {
      const newMessage = { text: messageText }; 
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('sendMessage', { text: messageText });
      setMessageText('');
     
    };

    const handleNewMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };



    return(
        <div className="App">
        <h1>Real-Time Chat App</h1>
        <div className="messages">
          {messages.map((message, index) => (
            <Message key={index} username={message.username} text={message.text} />
          ))}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    )


}