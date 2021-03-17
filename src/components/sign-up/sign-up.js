import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom"


const SignUp = () => {
    const handleSubmit = () => {
        //    TODO: implement check for valid info
        setValidCredentials(true);
    }

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validCredentials, setValidCredentials] = useState(false);


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
                    <input id="passwordFld" placeholder="Enter a password" className="form-control"
                           value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                </div>


                <button className="btn btn-success btn-block" onClick={handleSubmit}>
                    Start Chores
                </button>

                {
                    validCredentials &&
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

export default SignUp;