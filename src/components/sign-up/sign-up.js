import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom"
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";


const SignUp = ({
                    signUp,
                    logIn,
                    loggedIn
                }) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        // TODO: need to handle user feedback on bad input
        signUp(email, username, password)
        logIn(email, password)
    }

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="container">
            <h1 className="text-center">
                Sign Up
            </h1>

            <h3 className="text-center">
                Join Chore Chasers!
            </h3>

            {/*TODO: figure out floating labels*/}
            <form>
                <div className="form-group">
                    <label htmlFor="emailFld" className="label">
                        Email:
                    </label>
                    <input id="emailFld" placeholder="example@domain.com"
                           className="form-control"
                           value={email}
                           onChange={(event) => setEmail(event.target.value)}/>

                </div>

                <div className="form-group">
                    <label htmlFor="usernameFld" className="label">
                        What would you like to be called?
                    </label>
                    <input id="usernameFld" placeholder="John" className="form-control"
                           value={username}
                           onChange={(event) => setUsername(event.target.value)}/>

                </div>

                <div className="form-group">
                    <label htmlFor="passwordFld" className="label">
                        Set up a secure password to access your choice in the future:
                    </label>
                    {/*TODO: figure out if want to have confirm password and hidden type*/}
                    <input id="passwordFld" placeholder="Enter a password" className="form-control"
                           value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                </div>


                <button className="btn btn-success btn-block" onClick={(event => handleSubmit(event))}>
                    Start Chores
                </button>

                {
                    loggedIn &&
                        <Redirect to="/choreManager"/>
                }


                <br/>
                <br/>

                <div className="mx-auto text-center">
                    Already have an account?

                    <br/>

                    <Link to="/login" className="btn btn-info mt-2">
                        Log In
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
    signUp : (email, username, password) => applicationActions.signUp(dispatch, email, username, password),
    logIn : (email, password) => applicationActions.logIn(dispatch, email, password)
})

export default connect(stpm, dtpm)(SignUp);
