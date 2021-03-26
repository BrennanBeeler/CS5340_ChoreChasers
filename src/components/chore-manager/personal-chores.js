import React, {useState} from "react";
import "./personal-chores.css"
import {Button} from "react-bootstrap";
import CreateChoreModal from "../create-chore/create-chore-modal"
import ChoreDisplay from "./chore-display";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";

const PersonalChores = ({
                            activeGroupId,
                            activeProfile,
                            chores,
                            getGroupData,
                            deleteChore
                        }) => {
    const [choreModal, setChoreModal] = useState(false);

    // const handleDelete = (choreId) => {
    //     deleteChore(group, choreId)
    // }

    return(
        <div className="container-fluid">
            <div className="row">
                Today's Progress

                <Button variant="primary" onClick={() => setChoreModal(true)}>
                    Create Chore
                </Button>
            </div>

            <CreateChoreModal key={new Date().getTime()} show={choreModal}
                              onHide={()=> setChoreModal(false)} group={"Personal Chores"}/>

            <div className="progress hci-personal-progress-div">
                <div className="progress-bar hci-personal-progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                     aria-valuemax="100">
                    0/1
                </div>
            </div>
            <br/>

            <h1>
                Personal Chores
            </h1>

            <ChoreDisplay key={new Date().getTime()} chores={chores}/>
        </div>
    )
}

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    // TODO: eventually groups will be actually populated
    chores : state.profile.chores
})

const dtpm = (dispatch) => ({
    getGroupData : (profile, groupId) => applicationActions.getGroupData(dispatch, profile, groupId)
    // deleteChore : (group, choreId) => applicationActions.deleteChore(dispatch, group, choreId)
})

export default connect(stpm, dtpm)(PersonalChores);