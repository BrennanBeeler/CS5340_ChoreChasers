import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import actions from "../../actions/actions";

const Login = ({
                   checkLoginCredentials,
                    loggedIn = false
               }) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        checkLoginCredentials(email, password)
    }

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="container">
            <h1 className="text-center">
                Log In
            </h1>

            <h3 className="text-center">
                Pick up where you left off!
            </h3>

            <form>
                <div className="form-group">
                    <label htmlFor="emailFld" className="label ">
                        Email *
                    </label>
                    <input id="emailFld" placeholder="example@domain.com" className="form-control"
                           value={email} onChange={(event => setEmail(event.target.value))}/>

                </div>

                <div className="form-group">
                    <label htmlFor="passwordFld" className="label">
                        Password *
                    </label>
                    <input id="passwordFld" placeholder="Enter your password" className="form-control"
                           value={password} onChange={(event => setPassword(event.target.value))}/>
                </div>

                {/*TODO: figure out why this is clearing fields*/}
                <button className="btn btn-success btn-block" onClick={(event) =>  handleSubmit(event)}>
                    Start Chores
                </button>

                {
                    loggedIn &&
                    <Redirect to="/choreManager"/>
                }

                <br/>
                <br/>

                <div className="mx-auto text-center">
                    New to Chore Chasers?

                    <br/>

                    <Link to="/signUp" className="btn btn-info mt-2">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    )
}

const stpm = (state) => ({
    loggedIn: state.loggedIn
})

const dtpm = (dispatch) => ({
    checkLoginCredentials : (email, password) => actions.logIn(dispatch, email, password)
})

export default connect(stpm, dtpm)(Login);