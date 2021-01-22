import { GET_ERRORS, ErrorAction } from '../actions/types';

interface ErrorProps {
    msg: string;
    status: string | null;
}

const initialState: ErrorProps = {
    msg: '',
    status: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action: ErrorAction): ErrorProps => {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
            };
        default:
            return state;
    }
};
