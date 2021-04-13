import React, {useState} from "react";
import "./sign-up.css"
import {Link, Redirect} from "react-router-dom"
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";


const SignUp = ({
                    signUp,
                    loggedIn
                }) => {

    //TODO: figure out async and check if account created
    async function handleSubmit(event) {
        event.preventDefault()
        // TODO: need to handle user feedback on bad input

        let success = await signUp(email, username, password)

        console.log(success)

        if (success === false) {
            alert("Account not created")
        }
        else {
            alert("Account created")
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
                <br/><p></p>
            {/*TODO: fix appearance of sign up*/}
            <form>
                <div className="form-group">
                    <label htmlFor="emailFld" className="label form-headers">
                        <div className="form-text-field-signup">Email *</div>
                    </label>
                    <div>
                    <input type= "text" id="emailFld" placeholder="example@domain.com"
                           className="form-control"
                           value={email}
                           onChange={(event) => setEmail(event.target.value)}/></div>

                </div>

                <div className="form-group">
                    <label htmlFor="usernameFld" className="label form-headers">
                        <div className="form-text-field-signup">What would you like to be called?</div>
                    </label>
                    <div>
                    <input type="text" id="usernameFld" placeholder="John" className="form-control"
                           value={username}
                           onChange={(event) => setUsername(event.target.value)}/></div>

                </div>

                <div className="form-group">
                    <label htmlFor="passwordFld" className="label form-headers">
                        <div className="form-pass-field-signup">Set up a secure password to access your choice in the future:</div>
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
                <button className=" btn btn-success" onClick={handleSubmit} style={{paddingRight:"100px",paddingLeft:"100px"}}>
                    Start Chores
                </button>
                </div>


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
    loggedIn: state.loggedIn
})

const dtpm = (dispatch) => ({
    signUp : (email, username, password) => applicationActions.signUp(dispatch, email, username, password)
})

export default connect(stpm, dtpm)(SignUp);
