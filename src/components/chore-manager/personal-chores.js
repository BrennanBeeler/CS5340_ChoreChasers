import React, {useState} from "react";
import "./personal-chores.css"
import {Button, Modal} from "react-bootstrap";
import CreateChoreModal from "../create-chore/create-chore-modal"

const PersonalChores = () => {
    const [choreModal, setChoreModal] = useState(false);

    return(
        <div className="container-fluid">
            <div className="row">
                Today's Progress

                <Button variant="primary" onClick={() => setChoreModal(true)}>
                    Create Chore
                </Button>
            </div>


            <CreateChoreModal key={new Date().getTime()} show={choreModal} onHide={()=> setChoreModal(false)} group={"Personal Chores"}/>

            <div className="progress hci-personal-progress-div">
                <div className="progress-bar hci-personal-progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                     aria-valuemax="100">
                    0/1
                </div>
            </div>
            <br/>
        </div>
    )
}

export default PersonalChores;