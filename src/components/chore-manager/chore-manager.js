import React, {useState} from "react";
import PersonalChores from "./personal-chores";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import GroupChores from "./group-chores";
import CreateGroupModal from "../create-group/create-group-modal";
import "./chore-manager.css"

const ChoreManager = ({
                        profileUsername,
                        points,
                        setActiveGroup,
                        activeGroupId = "Personal Chores",
                        groups,
                      }) => {

    const [showCreateGroupModal, setCreateGroupModal] = useState(false);
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
    // TODO: It doesn't affect performance but this is pretty bad practice, change later
    updateLevel();

    return (
        <div className="hci-full-height row">
            {/*TODO: figure out how to keep separator between groups and chores moving*/}
            <div className="col-2 border-right hci-full-height">
                <div className="row-12 border-bottom border-dark pb-4">
                    <div className="level-header">
                        Level {level}
                    </div>
                    <div className="profile-points">
                        <Link to="/profile" className="btn fa fa-user-circle fa-3x"/>
                        {points}/{maxPoints} points
                    </div>
                    <div className="profile-link">

                    <Link to="/profile">
                        View {profileUsername}'s Account
                    </Link>
                    </div>
                </div>

                <button className="btn btn-info btn-block mt-4 pt-3 pb-3" onClick={() => setCreateGroupModal(true)}>
                    Create Group
                    <i className="fa fa-plus" style={{paddingLeft: "10px"}}/>
                </button>

                <CreateGroupModal key={new Date().getTime()} show={showCreateGroupModal}
                                  onHide={()=> setCreateGroupModal(false)}/>

                <br/>

                <ul className="nav flex-column nav-pills mt-4" role="navigation">

                    <li className={`nav-link nav-item mb-4 pt-4 pb-4 border border-dark group-button ${activeGroupId === "Personal Chores" ? 'active':''}`}
                        onClick={() => setActiveGroup("Personal Chores")}>
                        {activeGroupId === "Personal Chores" ? "Personal Chores" : "View Personal Chores"}
                    </li>

                    {
                        groups.map(group =>
                            <li className={`nav-link nav-item mb-4 pt-4 pb-4 border border-dark group-button ${activeGroupId === group.id ? 'active':''}`}
                                key={group.id}
                                onClick={() => setActiveGroup(group.id)}>
                                {activeGroupId === group.id ? group.name : "View " + group.name}
                            </li>
                        )
                    }
                </ul>
            </div>

            <div className="col-10" style={{paddingLeft: 0, paddingRight: 0}}>
                {
                    activeGroupId === "Personal Chores" &&
                    <PersonalChores/>

                }

                {
                    activeGroupId !== "Personal Chores" &&
                    <>
                        <GroupChores/>
                    </>
                }

            </div>
        </div>
    )
}

const stpm = (state) => ({
    profileUsername: state.profile.username,
    points: state.profile.points,
    activeGroupId: state.activeGroupId,
    groups : state.groups,
})

const dtpm = (dispatch) => ({
    signUp : (email, username, password) => applicationActions.signUp(dispatch, email, username, password),
    logIn : (email, password) => applicationActions.logIn(dispatch, email, password),
    setActiveGroup : (activeGroupId) => applicationActions.setActiveGroup(dispatch, activeGroupId)
})

export default connect(stpm, dtpm)(ChoreManager);

