import React, {useState} from "react";
import "./personal-chores.css"
import {Button, ProgressBar} from "react-bootstrap";
import CreateChoreModal from "../create-chore/create-chore-modal"
import ChoreDisplay from "./chore-display";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";

const PersonalChores = ({
                            activeGroupId,
                            activeProfile,
                            chores,
                            deletePersonalChore,
                            profileUsername
                        }) => {
    const [choreModal, setChoreModal] = useState(false);

    const handleDelete = (choreId) => {
        deletePersonalChore(choreId)
    }

    return(
        <div className="container-fluid">
            <div className="row">
                Today's Progress

                <Button variant="primary" onClick={() => setChoreModal(true)}>
                    Create Chore
                </Button>
            </div>

            {/*TODO: evaluate temp fix for duplicate keys- +15*/}
            <CreateChoreModal key={new Date().getTime() + 15} show={choreModal}
                              hide={()=> setChoreModal(false)} group={"Personal Chores"} profileUsername={profileUsername}/>

            <ProgressBar>
                <ProgressBar variant="success" now={35} key={1} />
            </ProgressBar>
            <br/>

            <h1>
                Personal Chores
            </h1>

            <ChoreDisplay key={new Date().getTime()} chores={chores} deleteChore={handleDelete}/>
        </div>
    )
}

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    chores : state.profile.chores,
    profileUsername : state.profile.username
})

const dtpm = (dispatch) => ({
    deletePersonalChore : (choreId) => applicationActions.deletePersonalChore(dispatch, choreId)
})

export default connect(stpm, dtpm)(PersonalChores);