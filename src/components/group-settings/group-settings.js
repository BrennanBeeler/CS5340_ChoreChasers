import React, {useState} from "react";
import {Link} from "react-router-dom";
import LeaveGroupModal from "./leave-group-modal";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import "./group-settings.css";

const GroupSettings = ({
                   profile,
                   group,
                    editGroup,
                  profileUsername
}) => {

    const [confirmationModal, setConfirmationModal] = useState(false);
    const [checked, setChecked] = useState(group?.progressBar || true);

    const toggleProgressBar = () => {
        group.progressBar = !group?.progressBar;
        setChecked(!checked);
        editGroup(group);
    };

    return (
        <div className="container">
            <div class="center-group-settings">
            <h1 className="text-center">
                Group Settings
            </h1>
          <br/>

            <h4 class=" text-left h4-settings-headers">
                'Weekly Progress Points' bar
            </h4>
            {/*<div className="custom-control custom-switch d-flex justify-content-around">*/}
            <div className="custom-control custom-switch d-flex toggle-div">
                <p/><p/>

                <p class="toggle-headers-enable">Disabled</p>
                <div>
              <input checked={group?.progressBar} value={checked} type="checkbox" className="custom-control-input" id="toggleProgressBar" onChange={toggleProgressBar}/>
              <label className="custom-control-label" htmlFor="toggleProgressBar"></label>
                </div>
                <p class="toggle-headers-disable">Enabled</p>

              <p/><p/>
            </div>

        <br/>

        <h4 class="text-left h4-settings-leave-group">
          Leave Group
        </h4>
          <p className="leave-group-description">You will be removed from this group. All progress will be lost.</p>
                <div className="leave-group-btn-div">
          <button className="leave-group-btn btn-danger"  onClick={() => setConfirmationModal(true)}>
            Leave Group
          </button>
                </div>
          <LeaveGroupModal show={confirmationModal} onHide={() => setConfirmationModal(false)}/>

          <br/>
          <br/>
                <Link to="/choreManager" className="back-button btn">
                    <i className="fa fa-caret-left" style={{paddingLeft: "10px", paddingRight:"15px"}}/>
                    Go Back
                </Link>
            </div>
        </div>
    )
}

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    group : state.groups.filter(group => group.id === state.activeGroupId)[0],
    profileUsername : state.activeProfile.username
})

const dtpm = (dispatch) => ({
    getGroupData : (profile, groupId) => applicationActions.getGroupData(dispatch, profile, groupId),
    deleteChore : (group, choreId) => applicationActions.deleteChore(dispatch, group, choreId),
    createChore : (groupId, chore) => applicationActions.createChore(dispatch, groupId, chore),
    editGroup: (group) => applicationActions.editGroup(dispatch, group)
})

export default connect(stpm, dtpm)(GroupSettings);