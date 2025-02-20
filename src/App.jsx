import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './component/Api'
import LandingPage from './component/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='p-2 bg-blue-950'>
      <LandingPage/>
    </div>
    </>
  )
}

export default App
