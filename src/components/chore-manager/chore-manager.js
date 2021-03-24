import React, {useEffect, useState} from "react";
import PersonalChores from "./personal-chores";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import GroupChores from "./group-chores";

const ChoreManager = ({
                        profile,
                        setActiveGroup,
                        activeGroup,
                        groups

                      }) => {

    useEffect(() => {
    //    TODO: get chores here


    })


    return (
        <div className="hci-full-height row">
            <div className="col-3 border-right hci-full-height">
                <div className="row-12 border-bottom border-dark pb-2">
                    Level 1
                    <br/>
                    <Link to="/profile" className="btn fa fa-user-circle fa-2x"/>
                    0/10 points
                    <br/>
                    <Link to="/profile">
                        {profile.username}'s Account
                    </Link>
                </div>

                <button className="btn btn-info btn-block mt-4">
                    Create Group
                    <i className="fa fa-plus"/>
                </button>

                <ul className="nav flex-column nav-pills mt-4" role="navigation">

                    <li className={`nav-link nav-item mb-4 border border-dark ${activeGroup === "Personal Chores" ? 'active':''}`}
                        onClick={() => setActiveGroup("Personal Chores")}>
                        Personal Chores
                    </li>

                    {
                        groups.map(group =>
                            <li className={`nav-link nav-item mb-4 border border-dark ${activeGroup === group ? 'active':''}`}
                                key={group}
                                onClick={() => setActiveGroup(group)}>
                                {group}
                            </li>
                        )
                    }
                </ul>
            </div>

            <div className="col-9">
                {
                    activeGroup === "Personal Chores" &&
                    <PersonalChores/>

                }

                {
                    activeGroup !== "Personal Chores" &&
                    <>
                        <GroupChores key={activeGroup}/>
                    </>
                }

            </div>
        </div>
    )
}

const stpm = (state) => ({
    profile: state.profiles[state.activeProfile],
    activeGroup: state.activeGroup,
    groups : state.groups
})

const dtpm = (dispatch) => ({
    signUp : (email, username, password) => applicationActions.signUp(dispatch, email, username, password),
    logIn : (email, password) => applicationActions.logIn(dispatch, email, password),
    setActiveGroup : (activeGroup) => applicationActions.setActiveGroup(dispatch, activeGroup)
})

export default connect(stpm, dtpm)(ChoreManager);


