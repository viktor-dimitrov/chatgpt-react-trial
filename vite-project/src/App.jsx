import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



import './App.css'

import ChatGpt from './components/ChatGpt/ChatGpt'
import Home from './components/Home/Home';
import Message from './components/Message/Message';
import ChatRoom from './components/ChatRoom/ChatRoom';





function App() {
  

  return (
    <>
    <BrowserRouter>
    

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chatgpt" element={<ChatGpt />} />
      <Route path="/chatroom" element={<ChatRoom />} />
        
        </Routes>

    

    </BrowserRouter>




    </>
  )
}

export default App
