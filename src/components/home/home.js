import React from "react";
import {Link} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'
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
                {/*<img src="/public/hangingclothes2.jpg" alt="Home page" width="4608" height="2088" className="mx-auto"/>*/}
                <div className="image-placeholder mx-auto">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                // src="holder.js/800x400?text=First slide&bg=373940"
                                alt="First slide"
                                width="500"
                                height="400"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                // src="/src/css-images/hangingclothes2.jpg/"
                                alt="Second slide"
                                width="500"
                                height="400"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                // src="holder.js/800x400?text=Third slide&bg=20232a"
                                alt="Third slide"
                                width="500"
                                height="400"
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    {/*<h4>TBD (Slideshow)</h4>*/}
                </div>


                {/*TODO: look into jumbotron from boostrap*/}
                <div className=" jumbotron col-lg-4 col-md-6 col-sm-6 col-xs-6 text-center offset-4 mx-auto align-self-center pb-4 pt-4">
                {/*<div className="jumbotron col-lg-3 col-md-6 col-sm-6 col-xs-6 offset-8 float-md-right ">*/}
                    <div className="font-weight-bolder about-header">
                        So what do we do?
                    </div>
                    <div class="about">
                        We help you keep track of your chores and make sure you have fun doing them!
                        Earn rewards and compete with group members to ultimately become the best Chore Chaser.
                    </div>
                    <br/>

                    <div>
                        Ready to become a Chore Chaser?
                    </div>

                    <Link to="/signUp" className="btn-lg about-signup">
                        Sign Up!
                    </Link>

                    <br/>

                    <div>
                    It'll just take a minute!
                    </div>

                </div>

            </div>

            <br/>
            <div class="extra-body-space">
            </div>

            {/*<blockquote className="text-center col-lg-4 col-md-6 col-sm-6 col-xs-6 offset-4">*/}
            {/*    <div className="font-weight-bold">*/}
            {/*        So what do we do?*/}
            {/*    </div>*/}
            {/*    We help you keep track of your chores and make sure you have fun doing them!*/}
            {/*    Earn rewards and compete with group members to become the best ChoreChaser*/}
            {/*</blockquote>*/}

            </div>
        </div>
    )
};

export default Home;