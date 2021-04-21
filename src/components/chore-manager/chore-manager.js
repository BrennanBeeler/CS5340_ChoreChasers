import React, {useState} from "react";
import PersonalChores from "./personal-chores";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import GroupChores from "./group-chores";
import CreateGroupModal from "../create-group/create-group-modal";
import "./chore-manager.css"
import AllMyChores from "./all-my-chores";

const ChoreManager = ({
                          profileUsername,
                          points,
                          setActiveGroup,
                          activeGroupId = "Personal Chores",
                          groups, loggedIn
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
        <>
            {
                loggedIn === true ?
                    <div className="hci-full-height row overall-background" style={{overflowY: "hidden"}}>
                        {/*LEFT COLUMN*/}
                        <div className="col-2 border-right hci-full-height">
                            {/*PROFILE AREA*/}
                            <div className="row border-bottom rounded-bottom border-right border-dark pb-4" style={{height : "160px"}}>
                                <div className="col level-header">
                                    Level
                                    <br/>
                                    {level}
                                </div>
                                <div className="col profile-points">
                                    <Link to="/profile" className="btn fa fa-user-circle fa-2x"/>
                                    <br/>
                                    {points}/{maxPoints} points
                                </div>
                                <div className="row justify-content-center profile-link" style={{width: "100%"}}>
                                    <Link to="/profile">
                                        View {profileUsername}'s Account
                                    </Link>
                                </div>
                            </div>

                            {/*CREATE GROUP BUTTON*/}
                            <div className="row" style={{height: "100px"}}>
                                <button className="btn btn-info hci-create-group btn-block mt-3 pt-2 pb-2 bord"
                                        onClick={() => setCreateGroupModal(true)}>
                                    Create Group
                                    <i className="fa fa-plus" style={{paddingLeft: "10px"}}/>
                                </button>
                            </div>

                            <CreateGroupModal key={new Date().getTime()} show={showCreateGroupModal}
                                              onHide={()=> setCreateGroupModal(false)}/>

                            {/* GROUP SELECT*/}
                            <div className="justify-content-center">
                                <div className="vertical-scrollable" style={{height: "calc(100vh - 260px)", paddingRight: "4px", paddingLeft: "4px"}}>
                                    <ul className="nav flex-column nav-pills mt-4" role="navigation" style={{marginLeft: "1px !important"}}>
                                        <li className={`nav-link nav-item mb-4 pt-3 pb-4 border border-dark group-button ${activeGroupId === "Personal Chores" ? 'active':''}`}
                                            onClick={() => setActiveGroup("Personal Chores")}>
                                            {activeGroupId === "Personal Chores" ? "My Personal Chores" : "View My Personal Chores"}
                                        </li>

                                        {groups.length > 0 ?
                                            <li className={`nav-link nav-item mb-4 pt-3 pb-4 border border-dark group-button ${activeGroupId === "All_my_chores" ? 'active':''}`}
                                                onClick={() => setActiveGroup("All_my_chores")}>
                                                {activeGroupId === "All_my_chores" ? "My Assigned Chores" : "View My Assigned Chores"}
                                            </li> : <div/>
                                        }

                                        {
                                            groups.map(group =>
                                                <li className={`nav-link nav-item mb-4 pt-3 pb-4 border border-dark group-button ${activeGroupId === group.id ? 'active':''}`}
                                                    key={group.id}
                                                    onClick={() => setActiveGroup(group.id)}>
                                                    {activeGroupId === group.id ? group.name : "View " + group.name}
                                                </li>
                                            )
                                        }

                                        {
                                            groups.length === 0 &&
                                            <div className="text-center">
                                                <br/>
                                                Created groups will
                                                <br/>
                                                show up here!
                                            </div>
                                        }

                                    </ul>
                                    <p></p>
                                </div>
                            </div>
                        </div>

                        {/*RIGHT COLUMN*/}
                        <div className="col col-10 hci-full-height">
                            {
                                activeGroupId === "Personal Chores" &&
                                <div className="row border-bottom rounded border-dark" style={{height: "160px"}}>
                                    <PersonalChores/>
                                </div>
                            }

                            {
                                activeGroupId === "All_my_chores" &&
                                <div className="row border-bottom rounded border-dark" style={{height: "160px"}}>
                                    <AllMyChores/>
                                </div>
                            }

                            {
                                (activeGroupId !== "Personal Chores" && activeGroupId !== "All_my_chores") &&
                                <div className="row border-bottom rounded border-dark" style={{height: "160px"}}>
                                    <GroupChores key={activeGroupId}/>
                                </div>
                            }
                        </div>
                    </div>
                    :
                    <Redirect to={"/"}/>
            }
        </>
    )
}

const stpm = (state) => ({
    profileUsername: state.activeProfile.username,
    points: state.activeProfile.points,
    activeGroupId: state.activeGroupId,
    groups : state.groups.filter(group => group.members.includes(state.activeProfile.username)),
    loggedIn: state.loggedIn
})

const dtpm = (dispatch) => ({
    signUp : (email, username, password) => applicationActions.signUp(dispatch, email, username, password),
    logIn : (email, password) => applicationActions.logIn(dispatch, email, password),
    setActiveGroup : (activeGroupId) => applicationActions.setActiveGroup(dispatch, activeGroupId)
})

export default connect(stpm, dtpm)(ChoreManager);

