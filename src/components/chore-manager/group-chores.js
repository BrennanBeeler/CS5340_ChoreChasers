import React from "react";
import ChoreDisplay from "./chore-display";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";

const GroupChores = ({
                         activeGroupId,
                         activeProfile,
                         group,
                         getGroupData,
                         deleteChore
                     }) => {

    // useEffect(() => {
    //     //    TODO: get chores from database and populate each column based on if has a due date
    //     getGroupData(activeProfile, activeGroupId)
    //
    // }, [activeGroupId])


    const handleDelete = (choreId) => {
        deleteChore(group, choreId)
    }

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

            <h1>
                {group.name}
            </h1>

            <ChoreDisplay key={new Date().getTime()} chores={group.chores} deleteChore={handleDelete}/>
        </div>
    )
}

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    // TODO: eventually groups will be actually populated
    group : state.groups.filter(group => group.id === state.activeGroupId)[0]
})

const dtpm = (dispatch) => ({
    getGroupData : (profile, groupId) => applicationActions.getGroupData(dispatch, profile, groupId),
    deleteChore : (group, choreId) => applicationActions.deleteChore(dispatch, group, choreId)
})

export default connect(stpm, dtpm)(GroupChores);