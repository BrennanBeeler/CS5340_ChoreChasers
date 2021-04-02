// import React, {useState} from "react";
// import {Button, FormCheck, Navbar} from "react-bootstrap";
// import DeleteChoreModal from "../delete-chore/delete-chore-modal";
// import applicationActions from "../../actions/actions";
// import {connect} from "react-redux";
// import EditChoreModal from "../edit-chore/edit-chore-modal";
//
// const ChoreCard = ({props, chore, group, updateProgress, addPoints, editChore, deleteChore}) => {
//     const [toggleText, setToggleText] = useState(0);
//     const [editModal, setEditModal] = useState(false);
//     const [completed, setCompleted] = useState(chore.done);
//     const [countDown, setCountDown] = useState(10);
//     const [visibility, setVisibility] = useState(true);
//     const toggleTextStr = ["View Details", "Hide Details"];
//
//     const successSound = new Audio("/success.wav");
//
//     const markCompleted = (event) => {
//         //TODO: handle promise
//         successSound.play();
//         addPoints(parseInt(chore.points));
//         updateProgress(parseInt(chore.points));
//         setCompleted(!completed);
//         chore.done = !chore.done;
//         editChore(chore, group);
//
//         // timeOut()
//     }
//
//     //TODO: figure out hiding completed chores
//     //TODO: this is causing a memory leak- need to investigate more thoroughly - needs to be cleared
//     // async function timeOut() {
//     //     await new Promise(res => setTimeout(() => setCountDown(countDown - 1), 10000))
//     //     //setVisibility(false);
//     // }
//
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//
//     const undoCompleted = () => {
//         addPoints(-parseInt(chore.points));
//         updateProgress(-parseInt(chore.points));
//         setCompleted(!completed);
//         chore.done = !chore.done;
//         editChore(chore, group);
//     }
//
//     // TODO: probably want to handle visibility as the chore display level
//     return(visibility &&
//            <>
//
//                <Navbar bg="light" expand="xs">
//                    <Navbar.Text>
//                        <h3>
//                            {chore.choreName}
//                        </h3>
//
//                        {completed ? <button className="btn" style={{position: "absolute", top: "3px", right: "5px"}} onClick={undoCompleted}>
//                                       Undo?</button>
//                                   : <FormCheck style={{position: "absolute", top: "10px", right: "10px"}} onClick={markCompleted}/>}
//
//                        {
//                            (chore.rewards.points === true || chore.rewards.realLifeItem === true) &&
//                            <div>
//                                Reward:
//
//                            </div>
//                        }
//                        {
//                            (chore.rewards.points === true) &&
//                            <div style={{paddingLeft: "10px"}}>
//                                Points: {chore.points}pts
//                            </div>
//                        }
//
//                        {
//                            (chore.rewards.realLifeItem === true) &&
//                            <div style={{paddingLeft: "10px"}}>
//                                Real Life Reward: {chore.realLifeItem}
//                            </div>
//                        }
//
//                    </Navbar.Text>
//
//                    <DeleteChoreModal key={new Date().getTime()} show={showDeleteModal}
//                                      hide={()=> setShowDeleteModal(false)} deleteChore={deleteChore} choreId={chore.id}/>
//
//                    <Navbar.Toggle style={{position: "absolute", bottom: "10px", right: "10px"}}
//                                   onClick={() => setToggleText(1 - toggleText)}>
//                        {toggleTextStr[toggleText]}
//                    </Navbar.Toggle>
//
//                    <Navbar.Collapse id="basic-navbar-nav">
//                        <Navbar.Text>
//                            {
//                                chore.dueDate !== null &&
//                                <>
//                                    <div>
//                                        Due Date: {new Date(chore.dueDate).toDateString()}
//                                    </div>
//
//                                    <br/>
//                                </>
//                            }
//
//                            {
//                                chore.choreInstructions !== "" &&
//                                <>
//                                    <div>
//                                        Chore Description: {chore.choreInstructions}
//                                    </div>
//                                    <br/>
//                                </>
//                            }
//
//                            <div>
//                                Repeat Chore: {chore.repeatChore}
//                            </div>
//
//                            <br/>
//
//                            <div>
//                                Assignor: {chore.assignor}
//                            </div>
//
//                            <br/>
//
//
//                            {
//                                chore.dateAdded !== null &&
//                                <>
//                                    <div>
//                                        Date Added: {new Date(chore.dateAdded).toDateString()}
//                                    </div>
//                                    <br/>
//                                </>
//                            }
//
//                            Assignees: {chore.assignees.join(", ")}
//
//
//                        </Navbar.Text>
//
//                        <br/>
//
//                        <div style={{paddingTop: "15px"}}>
//                            <Button style={{marginRight: "15px"}} onClick={() => {setEditModal(true)}}>
//                                Edit Chore
//                            </Button>
//                            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
//                                Delete Chore
//                            </Button>
//                        </div>
//                    </Navbar.Collapse>
//                </Navbar>
//                <EditChoreModal key={new Date().getTime()} show={editModal} onHide={()=> setEditModal(false)}
//                                group={group} chore={chore}/>
//            </>
//     )
// }
//
// const stpm = (state, ownProps) => ({
//     profile: state.profile,
//     group: state.activeGroupId,
//     props: ownProps,
// })
//
// const dtpm = (dispatch) => ({
//     addPoints: (points) => {applicationActions.addPoints(dispatch, points)},
//     editChore: (chore, groupId) => {applicationActions.editChore(dispatch, chore, groupId)}
// })
//
// export default connect(stpm, dtpm)(ChoreCard);


import React, {useState} from "react";
import "./chore-card.css"
import {Button, FormCheck, Navbar} from "react-bootstrap";
import DeleteChoreModal from "../delete-chore/delete-chore-modal";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import EditChoreModal from "../edit-chore/edit-chore-modal";

const ChoreCard = ({props, chore, group, updateProgress, addPoints, editChore, deleteChore}) => {
    const [toggleText, setToggleText] = useState(0);
    const [editModal, setEditModal] = useState(false);
    const [completed, setCompleted] = useState(chore.done);
    const [countDown, setCountDown] = useState(10);
    const [visibility, setVisibility] = useState(true);
    const toggleTextStr = ["View Details", "Hide Details"];
    const caret = ["fa fa-caret-down","fa fa-caret-up"];

    const successSound = new Audio("/success.wav");

    const cardStyle = {
        boxShadow: "0 15px 15px 0 rgba(0, 0, 0, 0.05), 0 15px 15px 0 rgba(0, 0, 0, 0.05)"
    };

    const markCompleted = (event) => {
        //TODO: handle promise
        successSound.play();
        addPoints(parseInt(chore.points));
        updateProgress(parseInt(chore.points));
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
        updateProgress(-parseInt(chore.points));
        setCompleted(!completed);
        chore.done = !chore.done;
        editChore(chore, group);
    }


    // TODO: probably want to handle visibility as the chore display level
    return(visibility &&
      <>

        <Navbar style={cardStyle} bg="light" expand="xs" >
            <Navbar.Text>
                <h3>
                    {chore.choreName}
                </h3>

                {/*{completed ? <button className="btn" style={{position: "absolute", top: "3px", right: "5px"}} onClick={undoCompleted}>*/}
                {/*      Undo?</button>*/}
                {/*  : <FormCheck style={{position: "absolute", top: "10px", right: "10px"}} onClick={markCompleted}/>}*/}

                {completed ?
                 <div>
                     <input id="undo" type="checkbox" checked="checked" className="btn" style={{position: "absolute", top: "10px", right: "10px"}} onClick={undoCompleted} />
                     <label htmlFor="undo" style={{position: "absolute", top: "8px", right: "40px"}}> Undo </label>
                 </div>
                           :
                 <div>
                 <input id="done" type="checkbox" style={{position: "absolute", top: "10px", right: "10px"}} onClick={markCompleted}/>
                     <label htmlFor="undo" style={{position: "absolute", top: "8px", right: "40px"}}> Done </label>
                 </div>
                }

                {
                    (chore.rewards.points === true || chore.rewards.realLifeItem === true) &&
                        <div>
                            Reward:
                        </div>
                }
                {
                    (chore.rewards.points === true) &&
                    <div>
                        {/*<div style={{paddingLeft: "10px"}}>*/}
                        Points: {chore.points}pts
                    </div>
                }

                {
                    (chore.rewards.realLifeItem === true) &&
                    <div>
                        {/*<div style={{paddingLeft: "10px"}}>*/}
                        Real Life Reward: {chore.realLifeItem}
                    </div>
                }

            </Navbar.Text>

            <DeleteChoreModal key={new Date().getTime()} show={showDeleteModal}
                              hide={()=> setShowDeleteModal(false)} deleteChore={deleteChore} choreId={chore.id}/>

            <Navbar.Toggle style={{position: "absolute", bottom: "10px", right: "10px"}}
              onClick={() => setToggleText(1 - toggleText)}>
                {toggleTextStr[toggleText]}
                <i className= {caret[toggleText]} style={{paddingLeft: "10px"}}/>
            </Navbar.Toggle>

            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Text>
                    {
                        chore.dueDate !== null &&
                        <>
                            <div>
                                Due Date: {new Date(chore.dueDate).toDateString()}
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
                        Repeat Chore: {chore.repeatChore}
                    </div>

                    <br/>

                    <div>
                        Assignor: {chore.assignor}
                    </div>

                    <br/>


                    {
                        chore.dateAdded !== null &&
                            <>
                                <div>
                                    Date Added: {new Date(chore.dateAdded).toDateString()}
                                </div>
                                <br/>
                            </>
                    }

                    Assignees: {chore.assignees.join(", ")}


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
      <EditChoreModal key={new Date().getTime()} show={editModal} onHide={()=> setEditModal(false)}
                      group={group} chore={chore}/>
      </>
    )
}

const stpm = (state, ownProps) => ({
    profile: state.profile,
    group: state.activeGroupId,
    props: ownProps,
})

const dtpm = (dispatch) => ({
    addPoints: (points) => {applicationActions.addPoints(dispatch, points)},
    editChore: (chore, groupId) => {applicationActions.editChore(dispatch, chore, groupId)}
})

export default connect(stpm, dtpm)(ChoreCard);
