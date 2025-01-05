import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter> {/* Add BrowserRouter to can use linke between pages */}
        <ChakraProvider> {/* Add ChakraProvider to can use Chakra UI */}
          <App />
        </ChakraProvider>
      </BrowserRouter>
  </StrictMode>,
)
