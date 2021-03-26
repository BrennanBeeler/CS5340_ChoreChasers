import React, {useState} from "react";
import {Button, Col, Form, Modal, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {connect} from "react-redux";
import applicationActions from "../../actions/actions";

const CreateGroupModal = ({props, createGroup, profile}) => {
    const [groupName, setGroupName] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberList, setMemberList] = useState([]);

    const handleMemberAdd = () => {
        if(memberName !== "" && !(memberName in memberList)) {
            setMemberList(memberList => [...memberList, memberName])
        }

        console.log(memberList)
    }

    const handleCreateGroup = () => {
        if(groupName !== "") {
            //TODO: construct group object here- likely ignore emails that aren't in database
            let group = {
                name: groupName,
                id: 2,
                progressBar: true,
                chores: []
            };
                    //TODO: CLAIMS ISNT FUNCTION- HELP
            createGroup(profile, group);

            props.onHide();
        }
    }


    return(
        // TODO: had to set animation to false because of issue with react-bootstrap https://github.com/react-bootstrap/react-bootstrap/issues/5075
        <Modal {...props} animation={false} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Add a New Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*TODO: find findDOMNode issue*/}
                <Form>
                    <Form.Group>
                        <Form.Label>Group Name *</Form.Label>
                        <Form.Control placeholder="Enter group name" value={groupName}
                                      onChange={event => setGroupName(event.target.value)}/>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Add Members *</Form.Label>

                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip {...props}>
                                    We need emails as an identifier to make
                                    sure we invite the right person!
                                </Tooltip>}>
                            <span className="btn fa fa-question-circle"/>
                        </OverlayTrigger>

                        <Form.Row>
                            <Col xs={10}>
                                <Form.Control placeholder="Enter member's email" type="email" value={memberName}
                                              onChange={event => setMemberName(event.target.value)}/>
                            </Col>
                            <Col xs={2}>
                                <Button onClick={() => handleMemberAdd()}>
                                    Add
                                </Button>
                            </Col>
                        </Form.Row>

                        {
                            //TODO: create pretty member tags/ allow removal
                            memberList.map(member =>
                                <div>
                                    {member}
                                </div>
                            )
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
                        {/*TODO: need to make creat group validate and submit data*/}
                        <Button variant="primary" onClick={handleCreateGroup}>
                            Create Group
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

const stpm = (state, ownProps) => ({
    profile: state.profile,
    props: ownProps
})

const dtpm = (dispatch) => ({
    createGroup: (profile, group) => {applicationActions.createGroup(dispatch, profile, group)}
})

export default connect(stpm, dtpm)(CreateGroupModal);
