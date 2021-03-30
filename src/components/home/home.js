// import React from "react";
// import {Link} from "react-router-dom";
//
// const Home = () => {
//     return(
//         <div>
//             <div className="row">
//                 <div className="col-4">
//                     <h1>
//                         Chore Chasers
//                     </h1>
//                 </div>
//
//                 <div className="col">
//
//                 </div>
//
//                 <div className="col-4">
//                     {/*TODO: figure out if want login/signup to disappear when logged in*/}
//                     <Link to="/login" className="btn btn-lg btn-primary float-right">
//                         Login
//                     </Link>
//
//                     <Link to="/signUp" className="btn btn-lg btn-info float-right">
//                         Sign Up
//                     </Link>
//                 </div>
//             </div>
//
//             <blockquote className="text-center font-weight-bold">
//                 Manage those pesky chores with ease... <br/>- and have fun with them too!
//             </blockquote>
//
//             <br/>
//
//
//
//             <div className="row">
//                 {/*TODO: need to figure out image*/}
//                 <img src="https://via.placeholder.com/500" alt="Home page" width="500" height="400" className="mx-auto"/>
//
//
//                 {/*TODO: look into jumbotron from boostrap*/}
//                 <div className="col-3 font-weight-bold text-center mx-auto align-self-center pb-5">
//                     Ready to finish some chores?
//
//                     <br/>
//
//                     <Link to="/signUp" className="btn btn-lg btn-info float-right">
//                         Sign Up
//                     </Link>
//
//                     <br/>
//
//                     It'll just take a minute!
//                 </div>
//             </div>
//
//             <br/>
//             <br/>
//
//             <blockquote className="text-center">
//                 <div className="font-weight-bold">
//                     So what do we do?
//                 </div>
//                 We help you keep track of your chores and make sure you have fun doing them!
//                 Earn rewards and compete with group members to become the best ChoreChaser
//             </blockquote>
//
//         </div>
//     )
// }
//
// export default Home;

import React from "react";
import {Link} from "react-router-dom";
import './home.css';

const Home = () => {
    return(
        <div>
            <div className="row">
                <div className="col-4">
                    <h1 class="header">
                        Chore Chasers
                    </h1>
                </div>

                <div className="col">

                </div>

                {/*<div className="register-buttons-container">*/}
                <div>
                    <div>
                    {/*TODO: figure out if want login/signup to disappear when logged in*/}
                    <Link to="/login" className=" btn-lg floated-register-buttons top-login">
                        Login
                    </Link>
                    </div>

                    <Link to="/signUp" className="btn-lg floated-register-buttons top-sign-up">
                        Sign Up
                    </Link>
                </div>
            </div>

            <div class="body-background position-relative">
            <blockquote id="intro1">
                Manage those pesky chores with ease... <br/>
            </blockquote>
            <blockquote id="intro2">
                - and have fun with them too!
            </blockquote>

            <br/>



            <div className="row">
                {/*TODO: need to figure out image*/}
                {/*<img src="https://via.placeholder.com/500" alt="Home page" width="500" height="400" className="mx-auto"/>*/}


                {/*TODO: look into jumbotron from boostrap*/}
                {/*<div className="col-3 font-weight-bold text-center mx-auto align-self-center pb-5">*/}
                <div className="jumbotron col-lg-4 col-md-6 col-sm-6 col-xs-6 offset-7 float-md-right ">
                    <div class="sign-up-jumbotron">
                Ready to finish some chores?

                    <br/>

                    <Link to="/signUp" className="btn btn-lg btn-info float-right">
                        Sign Up
                    </Link>

                    <br/>

                    It'll just take a minute!
                    </div>
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
        </div>
    )
};

export default Home;