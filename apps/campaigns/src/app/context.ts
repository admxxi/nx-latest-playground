import { createContext } from 'react';

export type EnvProps = {
  ASSETS_ROOT?: string;
  BASE_URL?: string;
  TOKEN?: string;
  CAMPAIGNS_API_URL?: string;
};

export const defaultValues = {
  TOKEN: '',
  ASSETS_ROOT: '',
  CAMPAIGNS_API_URL: '',
};

export const Context = createContext<EnvProps>(defaultValues);
