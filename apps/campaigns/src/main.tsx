import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app/app';
import { propsHandler } from '@nx17/props-handler';
import { Context, EnvProps, defaultValues } from './app/context';
import { BrowserRouter } from 'react-router-dom';

const rootEl = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootEl);
const envProps = propsHandler(rootEl) as EnvProps;

const props = {
  ...defaultValues,
  ...envProps,
} as EnvProps;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

root.render(
  <StrictMode>
    <Context.Provider value={props}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={envProps.BASE_URL}>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Context.Provider>
  </StrictMode>
);
