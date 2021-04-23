import React from "react";
import "./profile.css";
import {useState} from "react";
import {Col, Row, Button} from "react-bootstrap";
import Toast from 'react-bootstrap/Toast'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {ProgressBar} from "react-bootstrap";

import applicationActions from "../../actions/actions";

const Profile = ({
                        profile,
                        setBackground,
                      }) => {
  const defaultName = "Username";
  const {points} = profile;
    let level = 1;
    let maxPoints = 10;
    const updateLevel = () => {
      if (points < 10) {
        level = 1;
        maxPoints = 10;
      } else if (points < 100) {
        level = 2;
        maxPoints = 100;
      } else if (points < 1000000) {
        level = 3;
        maxPoints = 1000000;
      }
    };
    updateLevel();

  // const unlockableBackgrounds = ["https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg",
  //   "https://globetrender.com/wp-content/uploads/2020/05/Caribbean-beach.jpg",
  //   "https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   "https://i.pinimg.com/originals/48/e4/cc/48e4cccf453801f8af4cc28b701a52ee.jpg",
  //   "https://www.fau.edu/publicaffairs/branding/images/backgrounds/fau-background-2.jpg",
  //   "https://cdn.shopify.com/s/files/1/0235/8415/files/ZoomBackground_ResizedPPMCD12-008_00-FRONT_Cover_OL.jpg?v=1597779554&format=jpg"];
  const unlockableBackgrounds = ["/cool-background-white.png", "/cool-background2.svg", "/cool-background3.png", "/cool-background4.png", "/cool-background5.png", "/cool-background6.png"];

  const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Every time you unlock a new level, you can customize ChoreChasers to have an exciting new image as the background!
  </Tooltip>
);
    const [show, setShow] = useState(false);

    return (
        <div className="container">
            <div className="center-full-profile">
                <div className="mx-auto text-center">
                    <span className="btn fa fa-user-circle fa-4x"/>
                    <h2 className="text-center">
                        {profile.username || defaultName}'s Profile
                    </h2>
                    <div style={{paddingRight:"25px"}}>
                        <Link to="/profileSettings" className="btn fa fa-cog"/>
                        <Link to="/profileSettings" className="nav-link-center">
                            View Account Settings
                        </Link>
                    </div>
                    <br/>
                    <p></p>
                    <h4 className="text-center h4-profile-headers">
                        CURRENT LEVEL
                    </h4>
                    <div className="row justify-content-center">
                        <h6 style={{paddingLeft:"5px",paddingRight:"20px",marginBottom:"30px"}}>
                            {/*<div>*/}
                            Level {level}
                        </h6>
                        <div>
                            {/*<ProgressBar style={{paddingRight:"470px"}}>*/}
                            <ProgressBar>
                                <ProgressBar  variant="info" now={profile.points/maxPoints * 100} key={9}/>
                            </ProgressBar>
                            <div style={{paddingRight:"10px",paddingTop:"5px"}}>
                                {profile.points}/{maxPoints} points
                            </div>
                        </div>
                        {/* <text style={{padding: 7}}>*/}
                        {/*</text>*/}
                    </div>
                    <h5 style={{padding:5}}>
                        You're doing great, {profile.username || defaultName}! Keep up the good work.
                    </h5>
                    <br/>
                    <br/>
                    <div className="row justify-content-center " style={{height: "0px", margin: "0px"}}>
                        <h4 style={{paddingLeft:"20px"}}>
                            UNLOCKED LEVELS
                        </h4>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <span className="btn fa fa-question-circle"/>
                        </OverlayTrigger>
                    </div>
                    <div className="scrollbar scrollbar-primary mt-5 mx-auto" style={{height: "250px", maxHeight: "250px"}}>
                        <div className="unlocked-levels-div">
                            {unlockableBackgrounds.map((value, index) => {
                                return (
                                    <div key={value}>
                                        {
                                            index >= level ?
                                            (<div className="row" style = {{marginLeft:"370px"}}>
                                                <div className="col">
                                                    <p>Level {index + 1}</p>
                                                </div>
                                                <div className="col" style = {{paddingRight:"20px",paddingLeft:"20px"}}>
                                                    <img src={value} style={{height: "50px", width: "250px", filter: "blur(2px)", padding: '4px'}}/>
                                                </div>
                                                <div className="col">
                                                    <p>
                                                    🔒
                                                    </p>
                                                </div>
                                            </div>) :
                                            value === profile.background ?
                                                (<div className="row" style = {{marginLeft:"370px"}}>
                                                    <div className="col">
                                                        <p>Level {index + 1}</p>
                                                    </div>
                                                    <div className="col" style = {{paddingRight:"20px",paddingLeft:"20px"}}>
                                                        <img className="border border-dark" src={value} style={{height: "50px", width: "250px", padding: '4px'}}/>
                                                    </div>
                                                    <div className="col">
                                                        <button className="  btn btn-success disabled">
                                                            Selected
                                                        </button>
                                                    </div>
                                                </div>) :
                                                (<div className="row" style = {{marginLeft:"370px"}}>
                                                    <div className="col">
                                                        <p>Level {index + 1}</p>
                                                    </div>
                                                    <div className="col" style = {{paddingRight:"20px",paddingLeft:"20px"}}>
                                                        <img src={value} style={{height: "50px", width: "250px", padding: '4px'}}/>
                                                    </div>
                                                    <div className="col">
                                                        <button className=" set-background-btn btn-info" onClick={(event) => {setBackground(value);setShow(true)}}>
                                                            Set Background
                                                        </button>
                                                    </div>
                                                </div>)
                                        }
                                    </div>
                                )})}
                        </div>
                    </div>
                    <div className="toast-position ">
                    <Row>
                        <Col xs={6}>
                            <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide className="bg-success">
                                <Toast.Header>
                                    <img
                                        // src="holder.js/20x20?text=%20"
                                        className="rounded mr-2"
                                        alt=""
                                    />
                                    <strong className="mr-auto">Successfully Updated Background!</strong>
                                </Toast.Header>
                                {/*<Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>*/}
                            </Toast>
                        </Col>
                    </Row>
                    </div>
                    <br/>
                    <Link to="/choreManager" className=" back-button btn">
                        <i className="fa fa-caret-left" style={{paddingLeft: "10px", paddingRight:"15px"}}/>
                        Go Back
                    </Link>

                </div>
            </div>
        </div>
    )
}

const stpm = (state) => ({
    profile: state.activeProfile,
})

const dtpm = (dispatch) => ({
    setBackground : (url) => applicationActions.setBackground(dispatch, url)
})

export default connect(stpm, dtpm)(Profile);