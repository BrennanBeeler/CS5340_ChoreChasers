import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    return(
        <div>
            <div className="row">
                <div className="col-4">
                    <h1>
                        Chore Chasers
                    </h1>
                </div>

                <div className="col">

                </div>

                <div className="col-4">
                    {/*TODO: figure out if want login/signup to disappear when logged in*/}
                    <Link to="/login" className="btn btn-lg btn-primary float-right">
                        Login
                    </Link>

                    <Link to="/signUp" className="btn btn-lg btn-info float-right">
                        Sign Up
                    </Link>
                </div>
            </div>

            <blockquote className="text-center font-weight-bold">
                Manage those pesky chores with ease... <br/>- and have fun with them too!
            </blockquote>

            <br/>



            <div className="row">
                {/*TODO: need to figure out image*/}
                <img src="https://via.placeholder.com/500" alt="Home page" width="500" height="500" className="mx-auto"/>


                {/*TODO: look into jumbotron from boostrap*/}
                <div className="col-3 font-weight-bold text-center mx-auto align-self-center pb-5">
                    Ready to finish some chores?

                    <br/>

                    <Link to="/signUp" className="btn btn-lg btn-info float-right">
                        Sign Up
                    </Link>

                    <br/>

                    It'll just take a minute!
                </div>
            </div>

            <br/>
            <br/>

            <blockquote className="text-center">
                <div className="font-weight-bold">
                    So what do we do?
                </div>
                We help you keep track of your chores and make sure you have fun doing them!
                Earn rewards and compete with group members to become the best ChoreChaser
            </blockquote>

        </div>
    )
}

export default Home;