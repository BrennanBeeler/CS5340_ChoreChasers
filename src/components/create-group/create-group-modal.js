import React, {useState} from "react";
import {Button, Card, Col, Form, Modal, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {connect} from "react-redux";
import applicationActions from "../../actions/actions";

const CreateGroupModal = ({props, createGroup, profile, groups}) => {
    const [groupName, setGroupName] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberList, setMemberList] = useState([]);

    const handleMemberAdd = () => {
        if (!memberName.match(/.+@.+\..+/g)) {
            alert("Please make sure that you have entered a properly formatted email.")
        }
        else if (memberList.includes(memberName)){
            alert("You've already included that email.")
        }
        else {
            setMemberList(memberList => [...memberList, memberName])
            setMemberName('');
        }
    }

    const handleCreateGroup = () => {
        if(groupName !== "") {
            let group = {
                name: groupName,
                id: Date.now(),
                progressBar: true,
                chores: [],
                members: memberList.concat([profile.username]),
            };
            createGroup(profile, group);

            props.onHide();
        }
    }

    const handleRemoveGroup = (member) => {
        setMemberList(memberList.filter(element => element !== member))
    }


    return(
        <Modal {...props} animation={false} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Add a New Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                                <Button onClick={handleMemberAdd}>
                                    Add
                                </Button>
                            </Col>
                        </Form.Row>
                        <br/>

                        {
                            memberList.map(member =>
                                <Card style={{marginRight: "30px", paddingLeft: "10px"}}>
                                    <div>
                                        {member}
                                        <i className="fa fa-times float-right" style={{color: "red", paddingRight: "7px", paddingTop: "5px"}}
                                           onClick={() => handleRemoveGroup(member)}/>
                                    </div>
                                </Card>
                            )
                        }
                    </Form.Group>
                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Row style={{width: "100%"}}>
                    <Col xs={6}>
                        <Button variant="danger" block onClick={props.onHide}>
                            Nevermind
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button variant="primary" block onClick={handleCreateGroup}>
                            Create Group
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

const stpm = (state, ownProps) => ({
    profile: state.activeProfile,
    props: ownProps,
    groups: state.groups
})

const dtpm = (dispatch) => ({
    createGroup: (profile, group) => {applicationActions.createGroup(dispatch, profile, group)}
})

export default connect(stpm, dtpm)(CreateGroupModal);
