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
        if (!email.match(/.+@.+\..+/g)) {
            alert("Please make sure that you have entered a properly formatted email.")
        }
        else if (username === "") {
            alert("Please enter the name you want to be known by to other users!")
        }
        else if (password === "" || password.length < 8) {
            alert("Your password should be at least 8 characters long and hopefully unique! " +
                "Try a series of words or a phrase that might be easier to remember.")
        }
        else {
            if (!signUp(email, username, password, profiles)) {
                alert("Sorry! That email address is already associated with an account. " +
                    "You might already have an account with us?")
            }
            else {
                logIn(email, password, profiles)
            }
        }
    }

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                <form>
                    <div className="label-box-pair-signup form-group">
                        <div className="form-email-field-signup">What's your email? *</div>
                        <div>
                            <input type= "text" id="emailFld" placeholder="example@domain.com"
                                   className="form-control"
                                   value={email}
                                   onChange={(event) => setEmail(event.target.value)}/>
                        </div>

                    </div>

                    <div className="label-box-pair-signup form-group">
                        <div className="form-username-field-signup">What would you like to be called? *</div>

                        <div>
                            <input type="text" id="usernameFld" placeholder="John" className="form-control"
                                   value={username}
                                   onChange={(event) => setUsername(event.target.value)}/></div>

                    </div>

                    <div className="label-box-pair-signup form-group">
                        {/*TODO: figure out if want to have confirm password and hidden type*/}
                        <div className="form-pass-field-signup">Set up a secure password to access your choice in the future *</div>
                        <div>
                            <input type="password" id="passwordFld" placeholder="Enter a password" className="form-control"
                                   value={password}
                                   onChange={(event) => setPassword(event.target.value)}/></div>
                    </div>


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
            <Link to="/" className=" back-button btn">
                <i className="fa fa-caret-left" style={{paddingLeft: "10px", paddingRight:"15px"}}/>
                Go Back to Home
            </Link>
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