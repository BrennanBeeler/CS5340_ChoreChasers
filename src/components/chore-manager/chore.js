import {Button, FormCheck, Navbar} from "react-bootstrap";
import React, {useState} from "react";
import EditChoreModal from "../edit-chore/edit-chore-modal";

const Chore = (props) => {
  const [choreModal, setChoreModal] = useState(false);
  //<EditChoreModal key={new Date().getTime()} show={choreModal} onHide={()=> setChoreModal(false)} chore={...props}/>
  return (
    <div>
    <Navbar bg="light" expand="xs">
                            <Navbar.Text>
                                <h3>
                                    Chore Name
                                </h3>

                                <FormCheck style={{position: "absolute", top: "10px", right: "10px"}}/>

                                Reward: Test

                            </Navbar.Text>

                            <Navbar.Toggle style={{position: "absolute", bottom: "10px", right: "10px"}}>View Details</Navbar.Toggle>

                            <Navbar.Collapse id="basic-navbar-nav">
                                <Navbar.Text>
                                    Due Date:
                                    <br/>
                                    Chore Description:
                                    <br/>
                                    Assignor:
                                    <br/>
                                    Date Added:
                                    <br/>
                                    Assignees:
                                </Navbar.Text>

                                <br/>

                                <div style={{paddingBottom: "50px"}}>
                                    <Button style={{marginRight: "15px"}} onClick={() => {setChoreModal(true)}}>
                                        Edit Chore
                                    </Button>
                                    <Button variant="danger">
                                        Delete Chore
                                    </Button>
                                </div>
                            </Navbar.Collapse>
                        </Navbar>
    </div>
  )
};

export default Chore;