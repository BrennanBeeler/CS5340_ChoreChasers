import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import "./profile-settings.css"
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";

const ProfileSettings = ({
                   profile, toggleSound}) => {
  const handleSubmit = (event) => {
        event.preventDefault()
        // DELETE account request
    }

  const toggleSoundOnProfile = () => {
        setChecked(!checked);
        toggleSound(profile);
    };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(profile.soundEnabled || true);
    return (
        <div className="container">
            <div class="center-profile-settings">
            <h1 className="text-center">
                Account Settings
            </h1>
            <br/>
            <h4 className="text-left h4-settings-headers" style={{paddingLeft:"200px", marginTop:"20px",marginBottom:"30px"}}>
                Change Password
            </h4>


            <form>
                <div className="form-group">
                    <label htmlFor="oldPasswordFld" className="label form-headers">
                        <div class="form-text-field-group">Enter Old Password</div>
                    </label>
                    <input type="text" id="emailFld" placeholder="example@domain.com" className=" form-control "
                           value={oldPassword} onChange={(event => setOldPassword(event.target.value))}/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordFld" className="label form-headers">
                        <div class="form-text-field-group">Enter New Password</div>
                    </label>
                    <input type="text" id="passwordFld" placeholder="Enter your password" className=" form-control"
                           value={newPassword} onChange={(event => setNewPassword(event.target.value))}/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordFld" className="label form-headers">
                        <div class="form-text-field-group">Confirm Password</div>
                    </label>
                    <input type="text" id="passwordFld" placeholder="Re-enter your password" className="form-control form-text-field"
                           value={confirmPassword} onChange={(event => setConfirmPassword(event.target.value))}/>
                </div>

                {/*TODO: figure out why this is clearing fields*/}

                <div style={{paddingLeft:"200px", float:"left",marginTop:"20px"}}>
                <button className="btn btn-success" style={{paddingRight:"50px",paddingLeft:"50px"}} onClick={(event) =>  handleSubmit(event)}>
                    Confirm Changes
                </button>
                </div>

                <br/>
                <br/>

              <h4 className=" text-left h4-settings-headers" style={{paddingLeft: "200px", marginTop: "50px"}}>
                Completed Chore Sound
              </h4>
              <div className="custom-control custom-switch d-flex justify-content-around">
                <p/><p/>

                <p className="toggle-headers-enable ">Disabled</p>
                <div>
                  <input checked={profile.soundEnabled} value={checked} type="checkbox" className="custom-control-input"
                         id="toggleProgressBar" onChange={toggleSoundOnProfile}/>
                  <label className="custom-control-label" htmlFor="toggleProgressBar"></label>
                  {console.log(profile.soundEnabled)}
                </div>
                <p className="toggle-headers-disable">Enabled</p>

                <p/><p/>
              </div>
              <br/>

                <div className="mx-auto">

                    <h4 className="text-left h4-settings-headers" style={{paddingLeft:"200px", marginTop:"40px"}}>
                        Delete Account
                    </h4>

                    <p style={{paddingRight:"290px"}}>
                      This will permanently delete your Chore Chasers account.
                    </p>

                    <div style={{paddingLeft:"200px", float:"left"}}>
                    <Link to="/" className="btn btn-danger mt-2" style={{paddingRight:"50px",paddingLeft:"50px"}}>
                        Delete Account
                    </Link>
                    </div>
                </div>
            </form>
            <br/>
            <Link to="/profile" className="back-button btn">
                <i className="fa fa-caret-left" style={{paddingLeft: "10px", paddingRight:"15px"}}/>
                Return to Profile
            </Link>
        </div>
        </div>
    )
}

const stpm = (state) => ({
    profile: state.profile,
})

const dtpm = (dispatch) => ({
    toggleSound : (profile) => applicationActions.toggleSound(dispatch, profile)
})

export default connect(stpm, dtpm)(ProfileSettings);