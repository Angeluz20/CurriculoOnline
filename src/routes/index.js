import { Switch } from "react-router-dom";
import Route from './Route'
import Signin from "../Signin/signin";
import SignUp from "../pages/SignUp/SignUp";
import Home from '../pages/home/home'
import Profile from '../pages/profile/profile'
import EditCurriculo from "../pages/editCurriculo/edit";
export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Signin} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/home" component={Home} isPrivate />
            <Route exact path="/profile" component={Profile} isPrivate />
            <Route exact path="/edit" component={EditCurriculo } isPrivate />
            <Route exact path="/home/:id" component={Home} isPrivate />
        </Switch>
    )
}