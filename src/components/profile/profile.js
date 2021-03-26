import React, {useState} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./background-preview.css";

const Profile = ({
                        profile,
                      }) => {
  const defaultName = "Username";
  const level = parseInt(profile.level) || 1;
  const unlockableBackgrounds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Animated_Wallpaper_Windows_" +
  "10_-_Wallpaper_Engine.gif/440px-Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif", "https://img.freepik.com/free-" +
  "photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg?size=626&ext=jpg", "https://images." +
  "unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Animated_Wallpaper_Windows_" +
  "10_-_Wallpaper_Engine.gif/440px-Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif", "https://img.freepik.com/free-" +
  "photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg?size=626&ext=jpg", "https://images." +
  "unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80"];

  const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Every time you unlock a new level, you can customize ChoreChasers to have an exciting new image as the background!
  </Tooltip>
);

    return (
        <div className="container">
          <div className="mx-auto text-center">
            <span className="btn fa fa-user-circle fa-4x"/>
            <h2 className="text-center">
              {profile || defaultName}'s Profile
            </h2>
            <Link to="/profileSettings" className="btn fa fa-cog"/>
            <Link to="/profileSettings" className="nav-link-center">
                View Account Settings
            </Link>
            <div style={{padding: 20}} />

            <h4 className="text-center">
              CURRENT LEVEL
            </h4>
          <div className="row justify-content-center">
            <text style={{padding: 4}}>
              Level {level}
            </text>
            <div className="progress hci-personal-progress-div">
                <div className="progress-bar hci-personal-progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                     aria-valuemax="100">
                    0/1
                </div>
            </div>
             <text style={{padding: 4}}>
              0/50 points
            </text>
          </div>
            <h5 style={{padding:5}}>
              You're doing great, {profile || defaultName}! Keep up the good work.
            </h5>
            <div style={{padding: 10}} />
            <div className="row justify-content-center " style={{height: "0px", margin: "0px"}}>
            <h4>
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
              <div style={{"overflow-y": "scroll", "overflow-x": "hidden", maxHeight: "250px", margin: "4px"}}>
                {unlockableBackgrounds.map((value, index) => {
                  return (
                    <div>
                      {index >= level ?
                        (<div className="row justify-content-center align-items-center">
                          <p>Level {index + 1}</p>
                          <img src={value} style={{height: "50px", width: "120px", filter: "blur(2px)", padding: '4px'}}/>
                          <p>
                            🔒
                          </p>
                        </div>) :
                        (<div className="row justify-content-center align-items-center">
                          <p>Level {index + 1}</p>
                          <img src={value} style={{height: "50px", width: "120px", padding: '4px'}}/>
                          <button className="btn btn-info">
                            Set Background
                            </button>
                        </div>)
                      }
                    </div>
                )})}
              </div>
              <Link to="/choreManager" className="btn btn-info">
               Return to Chores
              </Link>
            </div>
          </div>
        </div>
    )
}

const stpm = (state) => ({
    profile: state.profile.username,
})

const dtpm = (dispatch) => ({

})

export default connect(stpm, dtpm)(Profile);