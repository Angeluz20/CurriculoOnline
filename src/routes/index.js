import { Switch } from "react-router-dom";
import Route from './Route'
import Signin from "../Signin/signin";
import SignUp from "../pages/SignUp/SignUp";
import Home from '../pages/home/home'
export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Signin} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/home" component={Home} isPrivate />
        </Switch>
    )
}