import React, {useState} from "react";
import {Modal, Button, Form, Tooltip, OverlayTrigger, Row, Col} from "react-bootstrap";
import "./create-chore-modal.css"
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import {Typeahead} from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

const CreateChoreModal = ({
                              hide,
                              show,
                              profileUsername,
                              createChore,
                              currentGroup,
                              groupOptions}) => {

    console.log(currentGroup)


    const [choreName, setChoreName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [repeatChore, setRepeatChore] = useState("Never");
    const [choreInstructions, setChoreInstructions] = useState("");
    const [choreGroup, setChoreGroup] = useState(currentGroup);
    const [rewardMode, setRewardMode] = useState(true);
    const [assignees, setAssignees] = useState([]);
    const [pointsChecked, setPointsChecked] = useState(false);
    const [prizeChecked, setPrizeChecked] = useState(false);
    const [prizeText, setPrizeText] = useState("");
    const [pointNumber, setPointNumber] = useState(0);

    const handleDate = () => {
        let newDate = new Date()

        // Due date is now around noon on whatever day is selected, all in local time - subtract 1 because of 0 vs 1 indexing
        newDate.setFullYear(parseInt(dueDate.substring(0, 4)), parseInt(dueDate.substring(5, 7)) - 1, parseInt(dueDate.substring(8, 10)))
        newDate.setHours(23, 59)

        return newDate.toISOString()
    }

    const validateChore = () => {
        //TODO: actually validate chores
        if(choreName === "") {
            alert("Please make sure to include a name for your chore")
            return;
        }

        //TODO: if users sets assignees then moves to personal group the chore will have assignees in personal- idk if matters

        let newChore = {
            id: Date.now(),
            done:false,
            choreName: choreName,
            dueDate: dueDate === "" ? null : handleDate(),
            repeatChore: repeatChore,
            choreInstructions: choreInstructions,
            rewards:{points:pointsChecked,realLifeItem:prizeChecked},
            points: pointNumber,
            realLifeItem: prizeText,
            splitReward:{everyoneGetsReward:rewardMode,fcfs:!rewardMode},
            dateAdded: new Date().toISOString(),
            assignor: profileUsername,
            assignees: (choreGroup.name === "Personal Chores" ? [profileUsername] : assignees)
        }

        //TODO: fix this use of name as identifier
        createChore(choreGroup.name, newChore)
        hide()
    }

    return (
        <Modal onHide={hide} animation={false} show={show} backdrop="static">
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
                        <Form.Label>When is it due? If not, it will appear in Undated Chores</Form.Label>
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
                        <Form.Label>Choose group for chore *</Form.Label>
                        <Form.Control as="select" value={choreGroup.id}
                                      onChange={event => {
                                        setChoreGroup(groupOptions.find(group =>
                                          group.id === event.target.value))}
                                      }>
                            {
                                groupOptions.map(option =>
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                )
                            }
                        </Form.Control>
                    </Form.Group>

                    {
                        //TODO: find better solution for users
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
                <Row style={{width: "100%"}}>
                    {/*TODO: figure out layout*/}
                    <Col xs={6}>
                        <Button variant="danger" block onClick={hide}>
                            Nevermind
                        </Button>
                    </Col>
                    <Col xs={6}>
                        {/*TODO: need to make creat chore validate and submit data*/}
                        <Button variant="primary" block onClick={validateChore}>
                            Create Chore
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

const stpm = (state,ownProps) => {
    let temp = {}

    //TODO: better place to do this?
    if (state.activeGroupId === "Personal Chores"){
        temp = {name: "Personal Chores", id: "Personal Chores"}
    }
    else if (state.activeGroupId === "All_my_chores") {
        temp = {name: "All_my_chores", id: "All_my_chores"}
    }
    else {
        temp = state.groups.filter(group => group.id === state.activeGroupId)[0]
    }

    return ({
        //TODO: remove use of filter, find instead?
        currentGroup:  temp,

        //TODO: fix groupOptions for all chores
        groupOptions: [{name: "Personal Chores", id : "Personal Chores", members: []}]
            .concat(state.groups.map(group => ({name: group.name, id: group.id, members: group.members}))),
        profileUsername : state.activeProfile.username
    })
}

const dtpm = (dispatch) => ({
    createChore : (groupName, chore) => applicationActions.createChore(dispatch, groupName, chore)
})

export default connect(stpm, dtpm)(CreateChoreModal);