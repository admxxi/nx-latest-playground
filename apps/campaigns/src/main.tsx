import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import App from './app/app';
import { propsHandler } from '@nx17/props-handler';

type EnvProps = {
  ASSETS_ROOT: string;
  BASE_URL: string;
  TOKEN: string;
};


const rootEl = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootEl);
const envProps = propsHandler(rootEl) as EnvProps;

root.render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <App {...envProps} />
    </QueryClientProvider>
  </StrictMode>
);
