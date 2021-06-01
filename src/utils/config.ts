import { RootState } from '../store';

interface Iconfig {
  headers: {
    'Content-type': string;
    Authorization?: string;
  };
}
export const config: Iconfig = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const tokenConfig = (getState: () => RootState): Iconfig => {
  // get token
  const { token } = getState().users;

  // Adding Token
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
};
