import React, {useState} from "react";
import {Modal, Button, Form, Tooltip, OverlayTrigger, Row, Col} from "react-bootstrap";
import "./create-chore-modal.css"

const CreateChoreModal = (props) => {
    const [choreName, setChoreName] = useState("");
    const [dueDate, setDueDate] = useState();
    const [repeatChore, setRepeatChore] = useState("");
    const [choreInstructions, setChoreInstructions] = useState("");
    const [choreGroup, setChoreGroup] = useState(props.group);
    const [rewardMode, setRewardMode] = useState();
    const [pointsChecked, setPointsChecked] = useState(false)
    const [prizeChecked, setPrizeChecked] = useState(false)

    const validateChore = () => {
        if(choreName === "") {
            alert("issue")
            return;
        }
    //    TODO: if all data looks good create the chore and submit to database

        props.onHide()
    }


    return (
        // TODO: had to set animation to false because of issue with react-bootstrap https://github.com/react-bootstrap/react-bootstrap/issues/5075
        <Modal {...props} animation={false} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Add New Chore</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>What is the chore called? *</Form.Label>
                        <Form.Control placeholder="Enter chore name" value={choreName}
                                      onChange={event => setChoreName(event.target.value)}/>
                    </Form.Group>

                    {/*TODO: need way to clear date*/}
                    <Form.Group>
                        <Form.Label>When is it due?</Form.Label>
                        <Form.Control type="date" value={dueDate} onChange={event => setDueDate(event.target.value)}/>
                    </Form.Group>

                    {/*TODO: decide how no-repeat looks*/}
                    <Form.Group>
                        <Form.Label>Does the chore need to repeat itself?</Form.Label>
                        <Form.Control as="select" value={repeatChore}
                                      onChange={event => setRepeatChore(event.target.value)}>
                            <option value="">Don't repeat</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </Form.Control>
                    </Form.Group>

                    {/*TODO: time a bad placeholder?*/}
                    <Form.Group>
                        <Form.Label>Have any chore instructions?</Form.Label>
                        <Form.Control as="textarea" placeholder="eg: finish before 5pm" value={choreInstructions}
                                      onChange={event => setChoreInstructions(event.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Chose your group *</Form.Label>
                        <Form.Control as="select" value={choreGroup}
                                      onChange={event => setChoreGroup(event.target.value)}>
                            <option value={choreGroup}>{choreGroup}</option>
                            {/*TODO: populate from list of possible user groups*/}
                        </Form.Control>
                    </Form.Group>

                    {/*TODO: handle assignees*/}
                    <Form.Group>
                        <Form.Label>Assignees</Form.Label>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Set a reward</Form.Label>


                        <Row>
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                    <Tooltip {...props}>
                                        Points from 10-100 can be appended to your total points
                                    </Tooltip>
                                }>
                            <span className="btn fa fa-question-circle"/>
                            </OverlayTrigger>

                            <Form.Check label="Points" type="checkbox" checked={pointsChecked}
                                        onChange={() => {setPointsChecked(!pointsChecked)}}/>
                        </Row>

                        <Row>
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip {...props}>Assign a real life treat to the chore</Tooltip>}>
                                <span className="btn fa fa-question-circle"/>
                            </OverlayTrigger>
                            <Form.Check label="Real-life item" type="checkbox" checked={prizeChecked}
                                        onChange={() => {setPrizeChecked(!prizeChecked)}}/>
                        </Row>

                        {
                            (pointsChecked || prizeChecked) &&
                            <>
                                <Form.Label>
                                    Competitive Label?
                                </Form.Label>

                                <Row>
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={
                                            <Tooltip {...props}>
                                                All assignees will receive the same reward.
                                                <br/>
                                                Eg: If points is set to 20pts, each assignee will receive 20pts.
                                            </Tooltip>}>
                                        <span className="btn fa fa-question-circle"/>
                                    </OverlayTrigger>

                                    <Form.Check type="radio" name="rewardRadios" id="cooperativeRadio"
                                                defaultChecked={true} onClick={() => setRewardMode("cooperative")}/>
                                    <label htmlFor="cooperativeRadio">
                                        Everyone gets the reward
                                    </label>

                                </Row>
                                <Row>
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={
                                            <Tooltip {...props}>This is a race! Whoever completes the chore first
                                            upon approval of the assignor will receive the reward.
                                            </Tooltip>}>
                                        <span className="btn fa fa-question-circle"/>
                                    </OverlayTrigger>

                                    <Form.Check type="radio" id="competitiveRadio" name="rewardRadios"
                                                onClick={() => setRewardMode("competitive")}/>
                                    <label htmlFor="competitiveRadio">
                                        First come first serve
                                    </label>
                                </Row>
                            </>
                        }
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Row>
                    {/*TODO: figure out layout*/}
                    <Col xs={6}>
                        <Button variant="danger" onClick={props.onHide}>
                            Nevermind
                        </Button>
                    </Col>
                    <Col xs={6}>
                        {/*TODO: nee to make creat chore validate and submit data*/}
                        <Button variant="primary" onClick={validateChore}>
                            Create Chore
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateChoreModal;