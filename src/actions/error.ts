import { GET_ERRORS } from './types';

// Return Error
export const returnErrors = (msg: string, status: string) => ({
    payload: {
        msg,
        status,
    },
    type: GET_ERRORS,
});
