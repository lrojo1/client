import { createRoot } from 'react-dom/client'; //createRoot 

import App from './App'; //imports the './App' component encapsulating the entire react application
import ContextProvider from './context/ContextProvider';

createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <App />
        
    </ContextProvider>
    );