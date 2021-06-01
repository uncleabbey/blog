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
import ThankYou from './containers/ThankYou';
import Verify from './containers/Verify';
import ForgotPassword from './containers/ForgotPassword';
import Page404 from './containers/Page404';
import ChangePassword from './containers/ChangePassword';

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
          <Route exact path="/thanks" component={ThankYou} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/verify" component={Verify} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route exact path="/posts/:id" component={PostDetails} />
          <Route exact path="/posts/:id/comments" component={CommentForm} />
          <PrivateRoute
            exact
            path="/create"
            component={AddPost}
            next={'create'}
          />
          <PrivateRoute
            exact
            path="/edit/:id"
            component={EditPost}
            next={'edit'}
          />
          <Route component={Page404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
