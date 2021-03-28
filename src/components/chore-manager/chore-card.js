import React, {useState} from "react";
import {Button, FormCheck, Navbar} from "react-bootstrap";
import DeleteChoreModal from "../delete-chore/delete-chore-modal";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import EditChoreModal from "../edit-chore/edit-chore-modal";

const ChoreCard = ({chore, group, addPoints, deleteChore}) => {
    const [toggleText, setToggleText] = useState(0);
    const [editModal, setEditModal] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [countDown, setCountDown] = useState(10);
    const [visibility, setVisibility] = useState(true);
    const toggleTextStr = ["View Details", "Hide Details"];

    const successSound = new Audio("/success.wav");

    const markCompleted = (event) => {
        successSound.play();
        addPoints(parseInt(chore.points));
        setCompleted(!completed);
        timeOut()
    }

    async function timeOut() {
        await new Promise(res => setTimeout(() => setCountDown(countDown - 1), 10000))
        //setVisibility(false);
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const undoCompleted = () => {
        addPoints(-parseInt(chore.points));
        setCompleted(!completed);
    }

    return(visibility &&
      <>

        <Navbar bg="light" expand="xs">
            <Navbar.Text>
                <h3>
                    {chore.choreName}
                </h3>

                {completed ? <button className="btn" style={{position: "absolute", top: "3px", right: "5px"}} onClick={undoCompleted}>
                      Undo?</button>
                  : <FormCheck style={{position: "absolute", top: "10px", right: "10px"}} onClick={markCompleted}/>}

                {
                    (chore.rewards.points === true || chore.rewards.realLifeItem === true) &&
                        <div>
                            Reward:

                        </div>
                }
                {
                    (chore.rewards.points === true) &&
                    <div style={{paddingLeft: "10px"}}>
                        Points: {chore.points}pts
                    </div>
                }

                {
                    (chore.rewards.realLifeItem === true) &&
                    <div style={{paddingLeft: "10px"}}>
                        Real Life Reward: {chore.realLifeItem}
                    </div>
                }

            </Navbar.Text>

            <DeleteChoreModal key={new Date().getTime()} show={showDeleteModal}
                              hide={()=> setShowDeleteModal(false)} deleteChore={deleteChore} choreId={chore.id}/>

            {/*<Navbar.Toggle style={{position: "absolute", bottom: "10px", right: "10px"}}>Details</Navbar.Toggle>*/}
            <Navbar.Toggle
              style={{position: "absolute", bottom: "10px", right: "10px"}}
              onClick={() => setToggleText(1 - toggleText)}>
                {toggleTextStr[toggleText]}
            </Navbar.Toggle>

            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Text>
                    {
                        chore.dueDate !== null &&
                        <>
                            <div>
                                Due Date: {chore.dueDate.toDateString()}
                            </div>

                            <br/>
                        </>
                    }

                    {
                        chore.choreInstructions !== "" &&
                        <>
                            <div>
                                Chore Description: {chore.choreInstructions}
                            </div>
                            <br/>
                        </>
                    }

                    <div>
                        Assignor: {chore.assignor}
                    </div>

                    <br/>


                    {/*{*/}
                    {/*    chore.dateAdded !== null &&*/}
                    {/*        <>*/}
                    {/*            <div>*/}
                    {/*                Date Added: {chore.dateAdded.toDateString()}*/}
                    {/*            </div>*/}
                    {/*            <br/>*/}
                    {/*        </>*/}
                    {/*}*/}

                    Assignees: {chore.assignees}

                </Navbar.Text>

                <br/>

                <div style={{paddingTop: "15px"}}>
                    <Button style={{marginRight: "15px"}} onClick={() => {setEditModal(true)}}>
                        Edit Chore
                    </Button>
                    <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                        Delete Chore
                    </Button>
                </div>
            </Navbar.Collapse>
        </Navbar>
      <EditChoreModal key={new Date().getTime()} show={editModal} onHide={()=> setEditModal(false)} group={group} chore={chore}/>
      </>
    )
}

const stpm = (state, ownProps) => ({
    profile: state.profile,
    group: state.activeGroupId,
    props: ownProps
})

const dtpm = (dispatch) => ({
    addPoints: (points) => {applicationActions.addPoints(dispatch, points)}
})

export default connect(stpm, dtpm)(ChoreCard);
