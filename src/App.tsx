import { Toaster } from 'react-hot-toast'
import RoutesConfig from './routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesConfig />
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
