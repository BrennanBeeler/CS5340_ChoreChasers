import React, {useState} from "react";
import PersonalChores from "./personal-chores";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import GroupChores from "./group-chores";
import CreateGroupModal from "../create-group/create-group-modal";
import PendingGroup from "./pending-group";

const ChoreManager = ({
                        profile,
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
            <div className="col-3 border-right hci-full-height">
                <div className="row-12 border-bottom border-dark pb-2">
                    Level {level}
                    <br/>
                    <Link to="/profile" className="btn fa fa-user-circle fa-2x"/>
                      {points}/{maxPoints} points
                    <br/>

                    <Link to="/profile">
                        View {profile}'s Account
                    </Link>
                </div>

                <button className="btn btn-info btn-block mt-4" onClick={() => setCreateGroupModal(true)}>
                    Create Group
                    <i className="fa fa-plus" style={{paddingLeft: "10px"}}/>
                </button>

                <CreateGroupModal key={new Date().getTime()} show={showCreateGroupModal}
                                  onHide={()=> setCreateGroupModal(false)}
                                  profile={profile}/>

                <br/>

                <ul className="nav flex-column nav-pills mt-4" role="navigation">

                    <li className={`nav-link nav-item mb-4 border border-dark ${activeGroupId === "Personal Chores" ? 'active':''}`}
                        onClick={() => setActiveGroup("Personal Chores")}>
                        {activeGroupId === "Personal Chores" ? "Personal Chores" : "View Personal Chores"}
                    </li>

                    {
                        groups.map(group =>
                            <li className={`nav-link nav-item mb-4 border border-dark ${activeGroupId === group.id ? 'active':''}`}
                                key={group.id}
                                onClick={() => setActiveGroup(group.id)}>
                                {activeGroupId === group.id ? group.name : "View " + group.name}
                            </li>
                        )
                    }
                </ul>
            </div>

            <div className="col-9" style={{paddingLeft: 0, paddingRight: 0}}>
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
    profile: state.profile.username,
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

