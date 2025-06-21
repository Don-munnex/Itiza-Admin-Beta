
// import './App.css'
import PinkDiv from './components/PinkDiv'
import Form from './components/Form'
import WriteUp from './components/WriteUp'
import Footer from './components/Footer'
import WalletContextProvider from './components/connection'

function App() {
  return (
    <>
      <div className='min-h-screen'> 
        <WalletContextProvider>
          <PinkDiv />
          <WriteUp />
          <Form />
          <Footer />
        </WalletContextProvider>
      </div>
    </>

  )
}

export default App
