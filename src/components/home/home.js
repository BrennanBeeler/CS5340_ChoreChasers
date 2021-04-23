import React from "react";
import {Link} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'
// import slide3 from "../css-images/slide3_progress_bar.png"
import './home.css';

const Home = () => {
    const slide1 = "/slide1_levels_points_progress.png";
    const slide2 = "/slide2_chore_detail.png";
    const slide3 = "/slide3_background.png";
    return(
        <body >
        <div className="page-bg" style={{overflowY: "scroll", overflowX:"hidden",paddingLeft:"5px"}}>
            <div className="row">
                <div className="col-4">
                    <h1 className="header">
                        Chore Chasers
                    </h1>
                </div>

                <div className="col">

                </div>

                <div>
                    <div>
                        <Link to="/login" className=" btn-lg floated-register-buttons top-login">
                            Login
                        </Link>
                    </div>

                    <Link to="/signUp" className="btn-lg floated-register-buttons top-sign-up">
                        Sign Up
                    </Link>
                </div>
            </div>

            <div className="body-background position-relative" style={{backgroundImage: "url(/hangingclothes2.jpg)"}}>
                <blockquote id="intro1">
                    Manage those pesky chores with ease... <br/>
                </blockquote>
                <blockquote id="intro2">
                    - and have fun with them too!
                </blockquote>

                <br/>

                <div className="row">
                    <div className="image-placeholder mx-auto">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    // src="holder.js/800x400?text=First slide&bg=373940"
                                    src={slide1}
                                    alt="First slide"
                                    width="500"
                                    height="400"
                                />
                                <Carousel.Caption>
                                    <h3 style={{color:"#5f5e5e"}}>Points and Levels</h3>
                                    <p>Earn points by finishing your chores and levelling up! You can check your own daily progress and your group's progress too.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    // src="/src/css-images/hangingclothes2.jpg/"
                                    src={slide2}
                                    alt="Second slide"
                                    width="500"
                                    height="400"
                                />
                                <p></p>

                                <Carousel.Caption>
                                    <h3 style={{color:"#5f5e5e"}}>Complete Pending Chores</h3>
                                    <p>Create, edit, delete and complete your chores! You can also assign chores to other members in your group.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    // src="holder.js/800x400?text=Third slide&bg=20232a"
                                    src={slide3}
                                    alt="Third slide"
                                    width="500"
                                    height="400"
                                />

                                <Carousel.Caption>
                                    <h3 style={{color:"#5f5e5e"}}>Customize ChoreChaser</h3>
                                    <p>Unlock new customization backgrounds as you level up and earn points!</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>

                    <div className=" jumbotron col-lg-4 col-md-6 col-sm-6 col-xs-6 text-center offset-4 mx-auto align-self-center pb-4 pt-4">
                        <div className="font-weight-bolder about-header">
                            So what do we do?
                        </div>
                        <div className="about">
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

                <div className="extra-body-space">
                </div>
            </div>
        </div>
        </body>
    )
};

export default Home;