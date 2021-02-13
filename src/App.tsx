import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import Nav from './components/layouts/Nav';
import Login from './containers/Login';
import { getUser } from './actions/users';
import Alerts from './components/layouts/Alerts';
import Register from './containers/Register';
import AddPost from './containers/AddPost';
import EditPost from './containers/EditPost';
import PrivateRoute from './components/PrivateRoute';
import PostDetails from './containers/PostDetails';
import { CommentForm } from './containers/PostDetails';

function App(): React.ReactElement {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);
    return (
        <BrowserRouter>
            <div>
                <Nav />
                <Alerts />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/posts/:id" component={PostDetails} />
                    <Route exact path="/posts/:id/comments" component={CommentForm} />
                    <PrivateRoute exact path="/create" component={AddPost} next={'create'} />
                    <PrivateRoute exact path="/edit/:id" component={EditPost} next={'edit'} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
