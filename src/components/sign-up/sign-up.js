import React, {useState} from "react";
import "./sign-up.css"
import {Link, Redirect} from "react-router-dom"
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";


const SignUp = ({
                    signUp,
                    logIn,
                    profiles,
                    loggedIn
                }) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        // TODO: need to handle user feedback on bad input
        if (!signUp(email, username, password, profiles)) {
            alert("That email address is already associated with an account.")
        }
        else {
            console.log(email, password, profiles)
            logIn(email, password, profiles)
        }
    }

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //TODO: redo once database is ready
    return (
        <div className="container">
            <div className="center-signup">
                <h1 className="text-center">
                    Sign Up
                </h1>

                <h3 className="text-center">
                    Join Chore Chasers!
                </h3>
                <br/><p/>
                {/*TODO: figure out floating labels*/}
                <form>
                    <div className="form-group">
                        <label htmlFor="emailFld" className="label form-headers">
                            <div className="form-text-field-signup">What's your email?*</div>
                        </label>
                        <div>
                            <input type= "text" id="emailFld" placeholder="example@domain.com"
                                   className="form-control"
                                   value={email}
                                   onChange={(event) => setEmail(event.target.value)}/></div>

                    </div>

                    <div className="form-group">
                        <label htmlFor="usernameFld" className="label form-headers">
                            <div className="form-text-field-signup">What would you like to be called?*</div>
                        </label>
                        <div>
                            <input type="text" id="usernameFld" placeholder="John" className="form-control"
                                   value={username}
                                   onChange={(event) => setUsername(event.target.value)}/></div>

                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordFld" className="label form-headers">
                            <div className="form-pass-field-signup">Set up a secure password to access your choice in the future.*</div>
                        </label>
                        {/*TODO: figure out if want to have confirm password and hidden type*/}
                        <div>
                            <input type="password" id="passwordFld" placeholder="Enter a password" className="form-control"
                                   value={password}
                                   onChange={(event) => setPassword(event.target.value)}/></div>
                    </div>

                    {// TODO: Sign up user
                    }
                    <div style={{paddingLeft:"30px",marginTop:"40px"}}>
                        <button onClick={handleSubmit} className=" btn btn-success" style={{paddingRight:"100px",paddingLeft:"100px"}}>
                            Start Chores
                        </button>
                    </div>

                    {
                        loggedIn &&
                        <Redirect to="/choreManager"/>
                    }

                    <br/><p></p>

                    <div className="mx-auto text-center">
                        Already have an account?

                        <br/>

                        <Link to="/login" className="btn btn-info mt-2">
                            Log In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}


const stpm = (state) => ({
    profiles: state.profiles,
    loggedIn: state.loggedIn
})

const dtpm = (dispatch) => ({
    signUp : (email, username, password, profiles) => applicationActions.signUp(dispatch, email, username, password, profiles),
    logIn : (email, password, profiles) => applicationActions.logIn(dispatch, email, password, profiles)
})

export default connect(stpm, dtpm)(SignUp);