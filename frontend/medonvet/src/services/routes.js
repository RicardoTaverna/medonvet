import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={Login}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;