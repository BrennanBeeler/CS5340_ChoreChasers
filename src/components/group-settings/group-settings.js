import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
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
            <h1 className="text-center">
                Group Settings
            </h1>
          <br/>

            <h4>
                Disable 'Weekly Progress Points' bar
            </h4>
            <div className="custom-control custom-switch d-flex justify-content-around">
              <p/><p/>
              Enabled
              <input checked={!group?.progressBar} value={checked} type="checkbox" className="custom-control-input" id="toggleProgressBar" onChange={toggleProgressBar}/>
              <label className="custom-control-label" htmlFor="toggleProgressBar"></label>
              Disabled
              <p/><p/>
            </div>

        <br/>

        <h4>
          Leave Group
        </h4>
          <p>You will be removed from this group. All progress will be lost.</p>
          <button className="btn btn-danger" onClick={() => setConfirmationModal(true)}>
            Leave Group
          </button>

          <LeaveGroupModal show={confirmationModal} onHide={() => setConfirmationModal(false)}/>

          <br/>
          <br/>
          <Link to="/choreManager" className="btn btn-info">
            Return to Chores
          </Link>
        </div>
    )
}

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    // TODO: eventually groups will be actually populated
    group : state.groups.filter(group => group.id === state.activeGroupId)[0],
    profileUsername : state.profile.username
})

const dtpm = (dispatch) => ({
    getGroupData : (profile, groupId) => applicationActions.getGroupData(dispatch, profile, groupId),
    deleteChore : (group, choreId) => applicationActions.deleteChore(dispatch, group, choreId),
    createChore : (groupId, chore) => applicationActions.createChore(dispatch, groupId, chore),
    editGroup: (group) => applicationActions.editGroup(dispatch, group)
})

export default connect(stpm, dtpm)(GroupSettings);