import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import io from 'socket.io-client';



import ChatGpt from './components/ChatGpt/ChatGpt'
import './App.css'
import Home from './components/Home/Home';

function App() {
  



  return (

    <BrowserRouter>
      <>

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chatgpt" element={<ChatGpt />} />
        
        </Routes>

      </>

    </BrowserRouter>
  )
}

export default App
