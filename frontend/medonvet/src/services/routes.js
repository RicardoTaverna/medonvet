import React from "react";

import { isAuthenticated } from './../services/auth';

import { BrowserRouter, Route, Switch, Redirect  } from "react-router-dom";
import AppPage from "../pages/AppPage";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />

);

const AutorizedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => isAuthenticated() ? (
                <Redirect to={{ pathname: "/app", state: { from: props.location } }} />
                
            ) : (
                <Component {...props} />
            )
        }
    />

);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/cadastro" component={Cadastro}/>
            <AutorizedRoute exact path="/login" component={Login}/>
            <PrivateRoute exact path="/app" component={AppPage} />
        </Switch>
    </BrowserRouter>
)

export default Routes;