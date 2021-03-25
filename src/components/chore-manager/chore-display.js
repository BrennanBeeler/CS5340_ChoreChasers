import React, {useEffect} from "react";
import {Button,
    Col,
    FormCheck,
    Navbar,
    Row
} from "react-bootstrap";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import {connect} from "react-redux";

const ChoreDisplay = ({
                        activeGroup
                      }) => {

    useEffect(() => {
    //    TODO: get chores from database and populate each column based on if has a due date

    })

    return(
        <div>
            <h1>
                {activeGroup}
            </h1>
            <div className="border-top border-dark">
                <Row>
                    <Col xs={6}>
                        <h3>
                            Due Today
                        </h3>

                        <br/>

                        <Navbar bg="light" expand="xs">
                            <Navbar.Text>
                                <h3>
                                    Chore Name
                                </h3>

                                <FormCheck style={{position: "absolute", top: "10px", right: "10px"}}/>

                                Reward: Test

                            </Navbar.Text>

                            <Navbar.Toggle style={{position: "absolute", bottom: "10px", right: "10px"}}>Details</Navbar.Toggle>

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
                                    <Button style={{marginRight: "15px"}}>
                                        Edit Chore
                                    </Button>
                                    <Button variant="danger">
                                        Delete Chore
                                    </Button>
                                </div>
                            </Navbar.Collapse>
                        </Navbar>

                        <br/>

                        <Navbar bg="light" expand="xs">
                            <Navbar.Text>
                                <h3>
                                    Chore Name
                                </h3>

                                <FormCheck style={{position: "absolute", top: "10px", right: "10px"}}/>

                                Reward: Test

                            </Navbar.Text>

                            <Navbar.Toggle style={{position: "absolute", bottom: "10px", right: "10px"}}>Details</Navbar.Toggle>

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
                                    <Button style={{marginRight: "15px"}}>
                                        Edit Chore
                                    </Button>
                                    <Button variant="danger">
                                        Delete Chore
                                    </Button>
                                </div>
                            </Navbar.Collapse>
                        </Navbar>

                        <br/>

                        {/*<Card>*/}
                        {/*    <Card.Body>*/}
                        {/*        <Card.Title>Chore Name</Card.Title>*/}
                        {/*        <FormCheck style={{position: "absolute", top: "10px", right: "10px"}}/>*/}
                        {/*        <Card.Text>*/}
                        {/*            <h6>Reward:</h6>*/}
                        {/*        </Card.Text>*/}
                        {/*        <Button variant="primary">Go somewhere</Button>*/}
                        {/*    </Card.Body>*/}
                        {/*</Card>*/}

                    </Col>

                    <Col xs={6}>
                        <h3>
                            Undated Chores
                        </h3>

                        <br/>

                        <Navbar bg="light" expand="xs">
                            <Navbar.Text>
                                <h3>
                                    Chore Name
                                </h3>

                                <FormCheck style={{position: "absolute", top: "10px", right: "10px"}}/>

                                Reward: Test

                            </Navbar.Text>

                            <Navbar.Toggle style={{position: "absolute", bottom: "10px", right: "10px"}}>Details</Navbar.Toggle>

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
                                    <Button style={{marginRight: "15px"}}>
                                        Edit Chore
                                    </Button>
                                    <Button variant="danger">
                                        Delete Chore
                                    </Button>
                                </div>
                            </Navbar.Collapse>
                        </Navbar>

                        <br/>

                        <Navbar bg="light" expand="xs">
                            <Navbar.Text>
                                <h3>
                                    Chore Name
                                </h3>

                                <FormCheck style={{position: "absolute", top: "10px", right: "10px"}}/>

                                Reward: Test

                            </Navbar.Text>

                            <Navbar.Toggle style={{position: "absolute", bottom: "10px", right: "10px"}}>Details</Navbar.Toggle>

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
                                    <Button style={{marginRight: "15px"}}>
                                        Edit Chore
                                    </Button>
                                    <Button variant="danger">
                                        Delete Chore
                                    </Button>
                                </div>
                            </Navbar.Collapse>
                        </Navbar>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

const stpm = (state) => ({
    activeGroup: state.activeGroup
})

const dtpm = (dispatch) => ({

})

export default connect(stpm, dtpm)(ChoreDisplay);
