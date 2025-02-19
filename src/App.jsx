import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './component/Api'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='p-2 bg-blue-950'>

   <Home/>
    </div>
    </>
  )
}

export default App
