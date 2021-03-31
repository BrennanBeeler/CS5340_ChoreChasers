import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import "./profile-settings.css"

const ProfileSettings = ({
                   profile}) => {
  const handleSubmit = (event) => {
        event.preventDefault()
        // DELETE account request
    }

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <div className="container">
            <div class="center-profile-settings">
            <h1 className="text-center">
                Account Settings
            </h1>
            <br/>
            <h4 className="text-left h4-settings-headers" style={{paddingLeft:"200px"}}>
                Change Password
            </h4>
                <p></p>

            <form>
                <div className="form-group">
                    <label htmlFor="oldPasswordFld" className="label form-headers">
                        Enter Old Password
                    </label>
                    <input id="emailFld" placeholder="example@domain.com" className="form-text-field form-control "
                           value={oldPassword} onChange={(event => setOldPassword(event.target.value))}/>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="passwordFld" className="label form-headers">
                        Enter New Password
                    </label>
                    <input id="passwordFld" placeholder="Enter your password" className="form-text-field form-control"
                           value={newPassword} onChange={(event => setNewPassword(event.target.value))}/>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="passwordFld" className="label form-headers">
                        Confirm Password
                    </label>
                    <input id="passwordFld" placeholder="Enter your password" className="form-control form-text-field"
                           value={confirmPassword} onChange={(event => setConfirmPassword(event.target.value))}/>
                </div>

                {/*TODO: figure out why this is clearing fields*/}
                <button className="btn btn-success" onClick={(event) =>  handleSubmit(event)}>
                    Confirm Changes
                </button>

                <br/>
                <br/>

                <div className="mx-auto">
                    <h4 className="text-left h4-settings-headers" style={{paddingLeft:"200px"}}>
                        Delete Account
                    </h4>

                    <p style={{paddingRight:"290px"}}>
                      This will permanently delete your Chore Chasers account.
                    </p>

                    <Link to="/" className="btn btn-danger mt-2">
                        Delete Account
                    </Link>
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

export default ProfileSettings;