import React, {useState} from "react";
import "./sign-up.css"
import {Link, useHistory} from "react-router-dom"
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";


const SignUp = ({
                    signUp
                }) => {

    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault()
        // TODO: need to handle user feedback on bad input

        if (await signUp(email, username, password)) {
            alert("Account created")
            history.push("/choreManager")
        }
        else {
            alert("Account not created")
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

                <div style={{paddingLeft:"30px",marginTop:"40px"}}>
                    <button className=" btn btn-success" onClick={handleSubmit} style={{paddingRight:"100px",paddingLeft:"100px"}}>
                        Start Chores
                    </button>
                </div>


                <br/><p/>

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
})

const dtpm = (dispatch) => ({
    signUp : (email, username, password) => applicationActions.signUp(dispatch, email, username, password)(dispatch)
})

export default connect(stpm, dtpm)(SignUp);
