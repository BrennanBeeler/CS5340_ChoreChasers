import React, {useState} from "react";
import './login-settings.css'
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import actions from "../../actions/actions";

const Login = ({
                   checkLoginCredentials,
                   loggedIn,
                   profiles
               }) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        checkLoginCredentials(email, password, profiles)
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
                    <div className="label-box-pair-login form-group">
                        {/*<label htmlFor="emailFld" className="label form-headers">*/}
                        {/*    <div className="form-text-field-login">Email *</div>*/}
                        {/*</label>*/}
                        <div className="form-email-field-login">Email *</div>
                        <div>
                            <input type="text" id="emailFld" placeholder="example@domain.com" className="form-control"
                                   value={email} onChange={(event => setEmail(event.target.value))}/> </div>

                    </div>

                    <div className="label-box-pair-login form-group">
                        {/*<label htmlFor="passwordFld" className="label form-headers">*/}
                        {/*    <div class="form-text-field-login">Password * </div>*/}
                        {/*</label>*/}
                        <div className="form-pass-field-login">Password *</div>
                        <input type="password" id="passwordFld" placeholder="Enter your password" className="form-control"
                               value={password} onChange={(event => setPassword(event.target.value))}/>
                    </div>

                    <br/>
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
    loggedIn: state.loggedIn,
    profiles: state.profiles
})

const dtpm = (dispatch) => ({
    checkLoginCredentials : (email, password, profiles) => actions.logIn(dispatch, email, password, profiles)
})

export default connect(stpm, dtpm)(Login);