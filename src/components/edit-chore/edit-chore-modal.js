import React, {useState} from "react";
import {Modal, Button, Form, Tooltip, OverlayTrigger, Row, Col} from "react-bootstrap";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";

const EditChoreModal = ({onHide, show, group, profileUsername, chore, editChore}) => {
    const [choreName, setChoreName] = useState(chore.choreName);
    const [dueDate, setDueDate] = useState(chore.dueDate);
    const [repeatChore, setRepeatChore] = useState(chore.repeatChore);
    const [choreInstructions, setChoreInstructions] = useState(chore.choreInstructions);
    // TODO: currently can only make chores from group you are in - fix
    const [choreGroup, setChoreGroup] = useState(group);
    const [rewardMode, setRewardMode] = useState(chore.rewardMode);
    const [pointsChecked, setPointsChecked] = useState(chore.pointsChecked)
    const [prizeChecked, setPrizeChecked] = useState(chore.prizeChecked)
    const [prizeText, setPrizeText] = useState(chore.prizeText)
    const [pointNumber, setPointNumber] = useState(chore.pointNumber)


    const validateChore = () => {
        if(choreName === "") {
            alert("issue")
            return;
        }

        //TODO: if users sets assignees then moves to personal group the chore will have assignees in personal- idk if matters

        let newChore = {
            id: chore.id,
            done:false,
            choreName: choreName,
            //TODO: Figure out no date
            dueDate: dueDate,
            repeatChore: repeatChore,
            choreInstructions: choreInstructions,
            rewards:{points:pointsChecked,realLifeItem:prizeChecked},
            points: pointNumber,
            realLifeItem: prizeText,
            splitReward:{everyoneGetsReward:rewardMode,fcfs:!rewardMode},
            dateAdded: new Date(),
            assignor: profileUsername,
            //TODO: need to figure out assignees for create
            assignees: []
        }

        editChore(newChore, choreGroup);
        onHide()
    }


    return (
        <Modal onHide={onHide} animation={false} show={show} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Edit Chore</Modal.Title>
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
                            <option value="Never">Don't repeat</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                        </Form.Control>
                    </Form.Group>

                    {/*TODO: time a bad placeholder?*/}
                    <Form.Group>
                        <Form.Label>Have any chore instructions?</Form.Label>
                        <Form.Control as="textarea" placeholder="eg: finish before 5pm" value={choreInstructions}
                                      onChange={event => setChoreInstructions(event.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Choose your group *</Form.Label>
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
                                    <Tooltip>
                                        Points from 10-100 can be appended to your total points
                                    </Tooltip>
                                }>
                            <span className="btn fa fa-question-circle"/>
                            </OverlayTrigger>

                            <Form.Check label="Points" type="checkbox" checked={pointsChecked}
                                        onChange={() => {setPointsChecked(!pointsChecked)}}/>

                            {
                                pointsChecked &&
                                    <Col>
                                        {/*0 20*/} {pointNumber}
                                        <Form.Group controlId="formBasicRange">
                                            <Form.Control type="range" value={pointNumber} min="0" max="20"
                                                          onChange={event => setPointNumber(parseInt(event.target.value))}/>
                                        </Form.Group>
                                    </Col>
                            }
                        </Row>

                        <Row>
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip>Assign a real life treat to the chore</Tooltip>}>
                                <span className="btn fa fa-question-circle"/>
                            </OverlayTrigger>
                            <Form.Check label="Real-life item" type="checkbox" checked={prizeChecked}
                                        onChange={() => {setPrizeChecked(!prizeChecked)}}/>

                            {
                                prizeChecked &&
                                <Col>
                                    <Form.Group>
                                        <Form.Control placeholder="Enter reward description" value={prizeText}
                                                      onChange={event => setPrizeText(event.target.value)}/>
                                    </Form.Group>
                                </Col>
                            }
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
                                            <Tooltip>
                                                All assignees will receive the same reward.
                                                <br/>
                                                Eg: If points is set to 20pts, each assignee will receive 20pts.
                                            </Tooltip>}>
                                        <span className="btn fa fa-question-circle"/>
                                    </OverlayTrigger>

                                    <Form.Check type="radio" name="rewardRadios" id="cooperativeRadio"
                                                defaultChecked={true} onClick={() => setRewardMode(true)}/>
                                    <label htmlFor="cooperativeRadio">
                                        Everyone gets the reward
                                    </label>

                                </Row>
                                <Row>
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={
                                            <Tooltip>This is a race! Whoever completes the chore first
                                            upon approval of the assignor will receive the reward.
                                            </Tooltip>}>
                                        <span className="btn fa fa-question-circle"/>
                                    </OverlayTrigger>

                                    <Form.Check type="radio" id="competitiveRadio" name="rewardRadios"
                                                onClick={() => setRewardMode(false)}/>
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
                        <Button variant="danger" onClick={onHide}>
                            Nevermind
                        </Button>
                    </Col>
                    <Col xs={6}>
                        {/*TODO: need to make creat chore validate and submit data*/}
                        <Button variant="primary" onClick={validateChore}>
                            Save & Exit
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

const stpm = (state) => ({
})

const dtpm = (dispatch) => ({
    editChore : (groupName, chore) => applicationActions.editChore(dispatch, groupName, chore)
})

export default connect(stpm, dtpm)(EditChoreModal);