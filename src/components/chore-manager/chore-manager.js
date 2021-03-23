import React, {useState} from "react";
import PersonalChores from "./personal-chores";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import GroupChores from "./group-chores";

const ChoreManager = ({
                        profile

                      }) => {

    const [currentGroup, setCurrentGroup] = useState();

    // console.log(profile)


    return (
        <div className="hci-full-height row">
            <div className="col-3 border-right hci-full-height">
                <div className="row-12 border-bottom border-dark pb-2">
                    Level 1
                    <br/>
                    <button className="btn fa fa-user-circle fa-2x"/>
                    0/10 points
                    <br/>
                    Username
                </div>

                <button className="btn btn-info btn-block mt-4">
                    Create Group
                    <i className="fa fa-plus"/>
                </button>

                <ul className="nav flex-column nav-pills mt-4" role="navigation">

                    <li className="nav-link nav-item active mb-4">
                        Personal Chores
                    </li>

                    <li className="nav-link nav-item mb-4 border border-dark">
                        Family Group Chores
                    </li>

                    <li className="nav-link nav-item border border-dark mb-4">
                        Roomies Chores
                    </li>

                </ul>
            </div>

            <div className="col-9">
                <PersonalChores/>

                {/*<GroupChores/>*/}
            </div>
        </div>
    )
}

const stpm = (state) => ({
    profile: state.profiles[state.activeProfile]
})

const dtpm = (dispatch) => ({
    signUp : (email, username, password) => applicationActions.signUp(dispatch, email, username, password),
    logIn : (email, password) => applicationActions.logIn(dispatch, email, password)
})

export default connect(stpm, dtpm)(ChoreManager);


