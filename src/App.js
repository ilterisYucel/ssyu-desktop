import { ChakraProvider } from '@chakra-ui/react'
import { RootRouter } from './components/routers/index.js';


function App() {
  return (
    <ChakraProvider>
      <RootRouter />
    </ChakraProvider>
  );
}

export default App;
