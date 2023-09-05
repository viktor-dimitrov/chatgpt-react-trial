import { useState } from 'react'

import ChatGpt from './components/ChatGpt'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <h1>My First Vite Project</h1>

     <ChatGpt/> 


    </>
  )
}

export default App
