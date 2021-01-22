import React, { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './store';
import Home from './containers/Home';
import Nav from './components/layouts/Nav';
import Login from './containers/Login';
import { loadUser } from './actions/users';
// import AddPost from './containers/AddPost';
// import PrivateRoute from './components/PrivateRoute';

function App(): React.ReactElement {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        {/* <PrivateRoute exact path="/posts/add" component={AddPost} next={'posts/add'} /> */}
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
