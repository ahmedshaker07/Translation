import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

import signIn from "./pages/loginPage/loginPage";
import signUp from "./pages/registerPage/registerPage";
import landingPage from "./pages/landingPage/landingPage";
import profile from "./pages/profilePage/profilePage";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={landingPage}/>
            <Route path="/login" component={signIn}/>
            <Route path="/register" component={signUp}/>
            <Route path="/profile" component={profile}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
