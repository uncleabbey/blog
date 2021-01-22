import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { IuserState } from '../actions/userTypes';
import { RootState } from '../store';

interface IPrivate {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
    next: string;
    auth: IuserState;
}

const PrivateRoute = ({ component: Component, next, auth, ...rest }: IPrivate) => {
    // eslint-disable-next-line no-param-reassign
    auth = useSelector((state: RootState) => state.users);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.loading) return <h2>Loading...</h2>;
                if (!auth.isAunthenticated) return <Redirect to={`/sign-in?next=${next}`} />;
                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;
// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// function ss() {
//     return 'gggg';
// }
// export default ss;
