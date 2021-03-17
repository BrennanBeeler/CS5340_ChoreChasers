import React from "react";
import {Link} from "react-router-dom";

const Login = () => {
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
                    <input id="emailFld" placeholder="example@domain.com" className="form-control"/>

                </div>

                <div className="form-group">
                    <label htmlFor="passwordFld" className="label">
                        Password *
                    </label>
                    <input id="passwordFld" placeholder="Enter your password" className="form-control"/>
                </div>


                <button className="btn btn-success btn-block">
                    Start Chores
                </button>

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

export default Login;