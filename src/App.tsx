import React from 'react'
// import './App.css'
import PinkDiv from './components/PinkDiv'
import PUPPY from './components/PUPPY'
import Form from './components/Form'
import WriteUp from './components/WriteUp'
import Footer from './components/Footer'
import WalletContextProvider from './components/connection'
import puppy from "./Images/puppy.jpg"

function App() {
  return (
    <>
      <div className='min-h-screen w-auto'> 
        
        <PinkDiv />
        <WriteUp />
        <Form />
        <Footer />

      </div>
    </>

  )
}

export default App
