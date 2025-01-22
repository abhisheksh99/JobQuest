import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import './index.css';
import App from './App.jsx';
import { Toaster } from 'sonner';
import store from './store/store';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
