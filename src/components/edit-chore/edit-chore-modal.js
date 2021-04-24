import React, {useState} from "react";
import {Modal, Button, Form, Tooltip, OverlayTrigger, Row, Col} from "react-bootstrap";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import {Typeahead} from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

const EditChoreModal = ({onHide, show, activeGroupId, profileUsername, chore, editChore, groups, currentGroup, groupOptions}) => {

    const [choreName, setChoreName] = useState(chore.choreName);
    const [dueDate, setDueDate] = useState(chore.dueDate);
    const [repeatChore, setRepeatChore] = useState(chore.repeatChore);
    const [choreInstructions, setChoreInstructions] = useState(chore.choreInstructions);
    const [choreGroup, setChoreGroup] = useState(currentGroup);
    const [rewardMode, setRewardMode] = useState(chore.rewards.points === true || chore.rewards.realLifeItem === true);
    const [assignees, setAssignees] = useState(chore.assignees)
    const [pointsChecked, setPointsChecked] = useState(chore.rewards.points)
    const [prizeChecked, setPrizeChecked] = useState(chore.rewards.realLifeItem)
    const [prizeText, setPrizeText] = useState(chore.realLifeItem)
    const [pointNumber, setPointNumber] = useState(chore.points)

    const validateChore = () => {
        if(choreName === "") {
            alert("Please make sure to include a name for your chore")
            return;
        }

        let newChore = {
            id: chore.id,
            done:false,
            choreName: choreName,
            dueDate: dueDate === undefined ? null : dueDate,
            repeatChore: repeatChore,
            choreInstructions: choreInstructions,
            rewards:{points:pointsChecked,realLifeItem:prizeChecked},
            points: pointNumber,
            realLifeItem: prizeText,
            splitReward:{everyoneGetsReward:rewardMode,fcfs:!rewardMode},
            dateAdded: chore.dateAdded,
            assignor: chore.assignor,
            assignees: (chore.group === "Personal Chores" ? [profileUsername] : assignees),
            group: chore.group
        }

        console.log(newChore)

        editChore(newChore);
        onHide();
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

                    <Form.Group>
                        <Form.Label>When is it due? If empty, it will appear in Undated Chores</Form.Label>
                        <div>
                            <Form.Control type="date" value={dueDate} onChange={event => {setDueDate(event.target.value)}}/>
                            {dueDate !== "" ? <btn className="btn btn-info mt-2" onClick={event => {setDueDate("")}}>Clear</btn> : <div/>}
                        </div>
                    </Form.Group>

                    {dueDate !== "" ?
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
                    </Form.Group> : <div/>}

                    <Form.Group>
                        <Form.Label>Have any chore instructions?</Form.Label>
                        <Form.Control as="textarea" placeholder="eg: Location is 50 Market Street" value={choreInstructions}
                                      onChange={event => setChoreInstructions(event.target.value)}/>
                    </Form.Group>

                    {
                        choreGroup.name !== "Personal Chores" &&

                        <Form.Group>
                            <Form.Label>Assignees</Form.Label>
                            <Typeahead
                                id="assignees"
                                onChange={setAssignees}
                                options={choreGroup.members}
                                placeholder="Type the name of the person this chore is assigned to..."
                                selected={assignees}
                                multiple
                                style={{width: "100%"}}
                            />
                        </Form.Group>
                    }

                    <Form.Group>
                        <Form.Label>Set a reward</Form.Label>


                        <Row>
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                    <Tooltip>
                                        Points from 0-20 can be appended to your total points
                                    </Tooltip>
                                }>
                            <span className="btn fa fa-question-circle"/>
                            </OverlayTrigger>

                            <Form.Check label="Points" type="checkbox" checked={pointsChecked}
                                        onChange={() => {setPointsChecked(!pointsChecked)}}/>

                            {
                                pointsChecked &&
                                    <Col>
                                        {pointNumber}
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
                <Row style={{width: "100%"}}>
                    <Col xs={6}>
                        <Button variant="danger" block onClick={onHide}>
                            Nevermind
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button  variant="primary" block onClick={validateChore}>
                            Save & Exit
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

const stpm = (state) => {
    let temp = {}

    if (state.activeGroupId === "Personal Chores" || state.activeGroupId === "All_my_chores"){
        temp = {name: "Personal Chores", id: "Personal Chores"}
    }
    else {
        temp = state.groups.filter(group => group.id === state.activeGroupId)[0]
    }
    return ({
        currentGroup:  temp,
        groupOptions: [{name: "Personal Chores", id : "Personal Chores", members: []}]
            .concat(state.groups.filter(group =>
                group.members.includes(state.activeProfile.username)).map(group =>
                    ({name: group.name, id: group.id, members: group.members}))),
        profileUsername : state.activeProfile.username,
        activeGroupId: state.activeGroupId
    })
}

const dtpm = (dispatch) => ({
    editChore : (chore) => applicationActions.editChore(dispatch, chore)
})

export default connect(stpm, dtpm)(EditChoreModal);