import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./profile-settings.css"
import DeleteAccountModal from "./delete-account-modal";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";

const ProfileSettings = ({
                   profile, toggleSound}) => {

  const toggleSoundOnProfile = () => {
        setChecked(!checked);
        toggleSound(profile);
    };

  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [checked, setChecked] = useState(profile.soundEnabled || true);
    return (
        <div className="container-account">
            <div class="center-profile-settings">
                <h1 className="text-center">
                    Account Settings
                </h1>

            <form>
              <DeleteAccountModal show={deleteAccountModal} onHide={() => setDeleteAccountModal(false)}/>

              <h4 className=" text-left h4-settings-complete-chores" >
                Completed Chore Sound
              </h4>
              <div className="custom-control custom-switch d-flex toggle-div-profile">
                <p/><p/>

                <p className="toggle-headers-enable ">Disabled</p>
                <div>
                  <input checked={profile.soundEnabled} value={checked} type="checkbox" className="custom-control-input"
                         id="toggleProgressBar" onChange={toggleSoundOnProfile}/>
                  <label className="custom-control-label" htmlFor="toggleProgressBar"></label>
                </div>
                <p className="toggle-headers-disable">Enabled</p>

                <p/><p/>
              </div>
                <div className="">
                    <h4 className="text-left h4-settings-delete-account" >
                        Delete Account
                    </h4>

                    <p className="delete-account-description">
                      This will permanently delete your Chore Chasers account.
                    </p>

                    <div className="delete-account-btn-div">
                    <btn onClick={() => setDeleteAccountModal(true)} className="delete-account-btn btn-danger mt-2">
                        Delete Account
                    </btn>
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
    profile: state.activeProfile,
})

const dtpm = (dispatch) => ({
    toggleSound : (profile) => applicationActions.toggleSound(dispatch, profile)
})

export default connect(stpm, dtpm)(ProfileSettings);