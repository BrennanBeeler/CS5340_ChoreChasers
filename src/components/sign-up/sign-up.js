import React from "react";
import {Link} from "react-router-dom"

const SignUp = () => {
    return (
        <div className="container">
            <h1 className="text-center">
                Sign Up
            </h1>

            <h3 className="text-center">
                Join Chore Chasers!
            </h3>

            <form>
                <div className="form-group">
                    <label htmlFor="emailFld" className="label ">
                        Email:
                    </label>
                    <input id="emailFld" placeholder="example@domain.com" className="form-control"/>

                </div>

                <div className="form-group">
                    <label htmlFor="usernameFld" className="label">
                        What would you like to be called?
                    </label>
                    <input id="usernameFld" placeholder="John" className="form-control"/>

                </div>

                <div className="form-group">
                    <label htmlFor="passwordFld" className="label">
                        Set up a secure password to access your choice in the future:
                    </label>
                    <input id="passwordFld" placeholder="Enter a password" className="form-control"/>
                </div>


                <button className="btn btn-success btn-block">
                    Start Chores
                </button>

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