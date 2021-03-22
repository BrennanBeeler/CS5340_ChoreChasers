import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import Home from "./components/home/home";
import applicationStore from "./store/application-store";
import Login from "./components/login/login";
import SignUp from "./components/sign-up/sign-up";
import ChoreManager from "./components/chore-manager/chore-manager";
import "./App.css"


function App() {
    return (
        <Provider store={applicationStore} classname="hci-full-height">
            <BrowserRouter>
                <div className="container-fluid hci-full-height">
                    <Route path={["/", "/home"]} exact={true}>
                        <Home/>
                    </Route>

                    <Route path="/login" exact={true}>
                        <Login/>
                    </Route>

                    <Route path="/signUp" exact={true}>
                        <SignUp/>
                    </Route>

                    <Route path="/choreManager" exact={true}>
                        <ChoreManager/>
                    </Route>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;