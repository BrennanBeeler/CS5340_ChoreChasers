import React, {useState} from "react";
import {Button, FormCheck, Navbar} from "react-bootstrap";
import DeleteChoreModal from "../delete-chore/delete-chore-modal";

const ChoreCard = ({chore, deleteChore}) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return(
        <Navbar bg="light" expand="xs">
            <Navbar.Text>
                <h3>
                    {chore.choreName}
                </h3>

                <FormCheck style={{position: "absolute", top: "10px", right: "10px"}}/>

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

            <Navbar.Toggle style={{position: "absolute", bottom: "10px", right: "10px"}}>Details</Navbar.Toggle>

            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Text>
                    {/*{*/}
                    {/*    chore.dueDate !== null &&*/}
                    {/*    <>*/}
                    {/*        <div>*/}
                    {/*            Due Date: {chore.dueDate.toDateString()}*/}
                    {/*        </div>*/}

                    {/*        <br/>*/}
                    {/*    </>*/}
                    {/*}*/}

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
                    <Button style={{marginRight: "15px"}}>
                        Edit Chore
                    </Button>
                    <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                        Delete Chore
                    </Button>
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default ChoreCard;