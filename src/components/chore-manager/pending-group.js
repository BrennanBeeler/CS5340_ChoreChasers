import React from "react";

const PendingGroup = (props) => {
  const handleAccept = () => {};
  const handleReject = () => {};
  return (
    <div>
      <li className={`nav-link nav-item border border-dark`}>
          Group Invite to: {props.groupName}
      </li>
      <button className="btn btn-outline-success mt-1" onClick={handleAccept}>
          Accept
      </button>
      <button className="btn btn-outline-danger mt-1" onClick={handleReject}>
          Decline
      </button>
    </div>
  );
};

export default PendingGroup;