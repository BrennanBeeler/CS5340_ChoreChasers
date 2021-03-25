import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import LeaveGroupModal from "./leave-group-modal";

const GroupSettings = ({
                   profile}) => {
  const handleToggle = (event) => {
        event.preventDefault()
        // flip progress bar
    };

  const [confirmationModal, setConfirmationModal] = useState(true);
    return (
        <div className="container">
            <h1 className="text-center">
                Group Settings
            </h1>
          <br/>

            <h4 className="text-left">
                Disable 'Weekly Progress Points' bar
            </h4>
            <div className="custom-control custom-switch row">
              <input type="checkbox" className="custom-control-input" id="toggleProgressBar"/>
              <label className="custom-control-label" htmlFor="toggleProgressBar"></label>
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
        </div>
    )
}

export default GroupSettings;