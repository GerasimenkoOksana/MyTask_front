import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {Home} from "./Home";
import ColumnList from "./ColumnList";
import {AuthPage} from "./AuthPage";

export const UserRoutes = isAutheticated =>{
    if(isAutheticated){
        return(
            <Switch>
                <Route path ="/" exact ><Home/></Route>
                <Route path="/tasks" ><ColumnList/></Route>
                <Redirect to="/" />
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path = "/" exact ><Home/></Route>
            <Route path = "/auth" exact ><AuthPage/></Route>
            <Redirect to="/" />
        </Switch>
    )
}