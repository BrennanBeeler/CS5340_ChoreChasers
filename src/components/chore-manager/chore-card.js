import React, {useState} from "react";
import "./chore-card.css"
import {Button, Navbar} from "react-bootstrap";
import DeleteChoreModal from "../delete-chore/delete-chore-modal";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import EditChoreModal from "../edit-chore/edit-chore-modal";

const ChoreCard = ({props, chore, group, profile, updateProgress, addPoints, editChore, deleteChore}) => {
    const [toggleText, setToggleText] = useState(0);
    const [editModal, setEditModal] = useState(false);
    const [completed, setCompleted] = useState(chore.done);
    const [countDown, setCountDown] = useState(10);
    const [visibility, setVisibility] = useState(true);
    const toggleTextStr = ["View Details", "Hide Details"];
    const caret = ["fa fa-caret-down","fa fa-caret-up"];

    const successSound = new Audio("/success.wav");

    const cardStyle = {
        boxShadow: "0 15px 15px 0 rgba(0, 0, 0, 0.1), 0 15px 15px 0 rgba(0, 0, 0, 0.1)"
    };
    const cardText = {
        color: "#070707",
}

    const markCompleted = (event) => {
        //TODO: handle promise
        if (profile.soundEnabled) {
            successSound.play();
        }
        addPoints(parseInt(chore.points));
        updateProgress(parseInt(chore.points), completed);
        setCompleted(!completed);
        chore.done = !chore.done;
        editChore(chore, group);

        // timeOut()
    }

    //TODO: figure out hiding completed chores
    //TODO: this is causing a memory leak- need to investigate more thoroughly - needs to be cleared
    // async function timeOut() {
    //     await new Promise(res => setTimeout(() => setCountDown(countDown - 1), 10000))
    //     //setVisibility(false);
    // }

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const undoCompleted = () => {
        addPoints(-parseInt(chore.points));
        updateProgress(-parseInt(chore.points), completed);
        setCompleted(!completed);
        chore.done = !chore.done;
        editChore(chore, group);
    }


    // TODO: probably want to handle visibility as the chore display level
    return(visibility &&
      <>

        <Navbar style={cardStyle} bg="light" expand="xs" >
            <Navbar.Text>
                <h4 style = {cardText}>
                    {chore.choreName}
                </h4>

                {/*{completed ? <button className="btn" style={{position: "absolute", top: "3px", right: "5px"}} onClick={undoCompleted}>*/}
                {/*      Undo?</button>*/}
                {/*  : <FormCheck style={{position: "absolute", top: "10px", right: "10px"}} onClick={markCompleted}/>}*/}

                {completed ?
                 <div style = {cardText}>
                     <input id="undo" type="checkbox" checked="checked" className="btn" style={{position: "absolute", top: "10px", right: "10px"}} onClick={undoCompleted} />
                     <label htmlFor="undo" style={{position: "absolute", top: "8px", right: "40px"}}> Undo </label>
                 </div>
                           :
                 <div style = {cardText}>
                 <input id="done" type="checkbox" style={{position: "absolute", top: "10px", right: "10px"}} onClick={markCompleted}/>
                     <label htmlFor="undo" style={{position: "absolute", top: "8px", right: "40px"}}> Done </label>
                 </div>
                }

                {
                    (chore.rewards.points === true || chore.rewards.realLifeItem === true) &&
                        <div style = {cardText}>
                            Reward:
                        </div>
                }
                {
                    (chore.rewards.points === true) &&
                    <div style = {cardText}>
                        {/*<div style={{paddingLeft: "10px"}}>*/}
                        Points: {chore.points}pts
                    </div>
                }

                {
                    (chore.rewards.realLifeItem === true) &&
                    <div style = {cardText}>
                        {/*<div style={{paddingLeft: "10px"}}>*/}
                        Real Life Reward: {chore.realLifeItem}
                    </div>
                }

            </Navbar.Text>

            <DeleteChoreModal key={new Date().getTime()} show={showDeleteModal}
                              hide={()=> setShowDeleteModal(false)} deleteChore={deleteChore} chore={chore}/>

            <Navbar.Toggle style={{position: "absolute", bottom: "10px", right: "10px", color:"#000"}}
              onClick={() => setToggleText(1 - toggleText)}>
                {toggleTextStr[toggleText]}
                <i className= {caret[toggleText]} style={{paddingLeft: "10px"}}/>
            </Navbar.Toggle>

            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Text>
                    {
                        chore.dueDate !== null &&
                        <>
                            <div style = {cardText}>
                                Due Date: {new Date(chore.dueDate).toDateString()}
                            </div>

                            <br/>
                        </>
                    }

                    {
                        chore.choreInstructions !== "" &&
                        <>
                            <div style = {cardText}>
                                Chore Description: {chore.choreInstructions}
                            </div>
                            <br/>
                        </>
                    }

                    <div style = {cardText}>
                        Repeat Chore: {chore.repeatChore}
                    </div>

                    <br/>

                    <div style = {cardText}>
                        Assignor: {chore.assignor}
                    </div>

                    <br/>


                    {
                        chore.dateAdded !== null &&
                            <>
                                <div style = {cardText}>
                                    Date Added: {new Date(chore.dateAdded).toDateString()}
                                </div>
                                <br/>
                            </>
                    }
                    <div style = {cardText}>
                        Assignees: {chore.assignees.join(", ")}
                    </div>


                </Navbar.Text>

                <br/>
              {!completed ?
                <div style={{paddingTop: "15px"}}>
                    <Button style={{marginRight: "15px"}} onClick={() => {setEditModal(true)}}>
                        Edit Chore
                    </Button>
                    <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                        Delete Chore
                    </Button>
                </div> : <div/>}
            </Navbar.Collapse>
        </Navbar>
      <EditChoreModal key={new Date().getTime()} show={editModal} onHide={()=> setEditModal(false)}
                      group={group} chore={chore}/>
      </>
    )
}

const stpm = (state, ownProps) => ({
    profile: state.activeProfile,
    group: state.activeGroupId,
    props: ownProps,
})

const dtpm = (dispatch) => ({
    addPoints: (points) => {applicationActions.addPoints(dispatch, points)},
    editChore: (chore, groupId) => {applicationActions.editChore(dispatch, chore, groupId)}
})

export default connect(stpm, dtpm)(ChoreCard);
