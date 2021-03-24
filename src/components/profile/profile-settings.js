import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";

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
            <h1 className="text-center">
                Account Settings
            </h1>

            <h3 className="text-left">
                Change Password
            </h3>

            <form>
                <div className="form-group">
                    <label htmlFor="oldPasswordFld" className="label ">
                        Enter Old Password
                    </label>
                    <input id="emailFld" placeholder="example@domain.com" className="form-control"
                           value={oldPassword} onChange={(event => setOldPassword(event.target.value))}/>

                </div>

                <div className="form-group">
                    <label htmlFor="passwordFld" className="label">
                        Enter New Password
                    </label>
                    <input id="passwordFld" placeholder="Enter your password" className="form-control"
                           value={newPassword} onChange={(event => setNewPassword(event.target.value))}/>
                </div>

                <div className="form-group">
                    <label htmlFor="passwordFld" className="label">
                        Enter New Password Again to Confirm
                    </label>
                    <input id="passwordFld" placeholder="Enter your password" className="form-control"
                           value={confirmPassword} onChange={(event => setConfirmPassword(event.target.value))}/>
                </div>

                {/*TODO: figure out why this is clearing fields*/}
                <button className="btn btn-success" onClick={(event) =>  handleSubmit(event)}>
                    Confirm Changes
                </button>

                <br/>
                <br/>

                <div className="mx-auto">
                    <h3 className="text-left">
                        Delete Account
                    </h3>

                    <p>
                      This will permanently delete your Chore Chasers account.
                    </p>

                    <button className="btn btn-danger mt-2">
                        Delete Account
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProfileSettings;