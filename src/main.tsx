import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ActiveUserContextProvider } from './contexts/ActiveUserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ActiveUserContextProvider>
        <App />
      </ActiveUserContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
