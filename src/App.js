import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import Home from "./components/home/home";
import applicationStore from "./store/application-store";
import Login from "./components/login/login";
import SignUp from "./components/sign-up/sign-up";

function App() {
    return (
        <Provider store={applicationStore}>
            <BrowserRouter>
                <div className="container-fluid">
                    <Route path={["/", "/home"]} exact={true}>
                        <Home/>
                    </Route>

                    <Route path="/login" exact={true}>
                        <Login/>
                    </Route>

                    <Route path="/signUp" exact={true}>
                        <SignUp/>
                    </Route>


                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
