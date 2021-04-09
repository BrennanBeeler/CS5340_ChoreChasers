import React, {useState} from "react";
import './login-settings.css'
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
            <div class="center-login">
            <h1 className="text-center">
                Log In
            </h1>

            <h3 className="text-center">
                Pick up where you left off!
            </h3>
                <br/><p></p>
            <form>
                <div className="form-group">
                    <label htmlFor="emailFld" className="label form-headers">
                        <div className="form-text-field-login">Email *</div>
                    </label>
                    <div>
                    <input type="text" id="emailFld" placeholder="example@domain.com" className="form-control"
                           value={email} onChange={(event => setEmail(event.target.value))}/> </div>

                </div>

                <div className="form-group">
                    <label htmlFor="passwordFld" className="label form-headers">
                        <div class="form-text-field-login">Password * </div>
                    </label>
                    <input type="password" id="passwordFld" placeholder="Enter your password" className="form-control"
                           value={password} onChange={(event => setPassword(event.target.value))}/>
                </div>

                <br/>
                {/*TODO: figure out why this is clearing fields*/}
                <button className="btn btn-success " onClick={(event) =>  handleSubmit(event)} style={{paddingRight:"100px",paddingLeft:"100px"}}>
                    Start Chores
                </button>

                {
                    loggedIn &&
                    <Redirect to="/choreManager"/>
                }

                <br/>
                <br/><p></p>

                <div className="mx-auto text-center">
                    New to Chore Chasers?

                    <br/>

                    <Link to="/signUp" className="btn btn-info mt-2">
                        Sign Up
                    </Link>
                </div>
            </form>
            </div>
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