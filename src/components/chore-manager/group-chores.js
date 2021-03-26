import React from "react";
import ChoreDisplay from "./chore-display";
import {Link} from "react-router-dom";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";

const GroupChores = ({
                         activeGroupId,
                         activeProfile,
                         group,
                         getGroupData
                     }) => {

    // useEffect(() => {
    //     //    TODO: get chores from database and populate each column based on if has a due date
    //     getGroupData(activeProfile, activeGroupId)
    //
    // }, [activeGroupId])

    return(
        <div className="container-fluid">
            <div className="row">
                Today's Progress

            </div>


            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                     aria-valuemax="100">
                    0%
                </div>
                <div className="progress-bar bg-success" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                     aria-valuemax="100">
                    0%
                </div>
                <div className="progress">
                    <div className="progress-bar bg-info" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100">
                        0%
                    </div>
                </div>
            </div>
            <br/>
            <Link to="/groupSettings" className="btn btn-info">
              Group Settings
            </Link>

            <h1>
                {group.name}
            </h1>

            <ChoreDisplay chores={group.chores}/>
        </div>
    )
}

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    // TODO: eventually groups will be actually populated
    group : state.groups[0]
})

const dtpm = (dispatch) => ({
    getGroupData : (profile, groupId) => applicationActions.getGroupData(dispatch, profile, groupId)
})

export default connect(stpm, dtpm)(GroupChores);