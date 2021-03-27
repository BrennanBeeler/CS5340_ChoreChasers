import React, {useState} from "react";
import ChoreDisplay from "./chore-display";
import {Link} from "react-router-dom";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import CreateChoreModal from "../create-chore/create-chore-modal";
import {Button, ProgressBar} from "react-bootstrap";

const GroupChores = ({
                         activeGroupId,
                         activeProfile,
                         group,
                         getGroupData,
                         deleteChore,
                         profileUsername,
                         createChore
                     }) => {

    // useEffect(() => {
    //     //    TODO: get chores from database and populate each column based on if has a due date
    //     getGroupData(activeProfile, activeGroupId)
    //
    // }, [activeGroupId])

    const [choreModal, setChoreModal] = useState(false);

    const handleDelete = (choreId) => {
        deleteChore(group, choreId)
    }

    return(
        <div className="container-fluid">

            {/*TODO: evaluate temp fix for duplicate keys- +15*/}
            <CreateChoreModal key={new Date().getTime() + 15} show={choreModal}
                              hide={()=> setChoreModal(false)} group={group.name}
                              profileUsername={profileUsername} createChore={createChore}/>

            <ProgressBar>
                <ProgressBar variant="success" now={35} key={1} />
                <ProgressBar variant="warning" now={20} key={2} />
                <ProgressBar variant="danger" now={10} key={3} />
            </ProgressBar>

            <Button variant="primary" onClick={() => setChoreModal(true)}>
                Create Chore
            </Button>

            <br/>
            <Link to="/groupSettings" className="btn btn-info">
              Group Settings
            </Link>

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
    group : state.groups.filter(group => group.id === state.activeGroupId)[0],
    profileUsername : state.profile.username
})

const dtpm = (dispatch) => ({
    getGroupData : (profile, groupId) => applicationActions.getGroupData(dispatch, profile, groupId),
    deleteChore : (group, choreId) => applicationActions.deleteChore(dispatch, group, choreId),
    createChore : (groupId, chore) => applicationActions.createChore(dispatch, groupId, chore)
})

export default connect(stpm, dtpm)(GroupChores);