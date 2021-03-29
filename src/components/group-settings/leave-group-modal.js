import {Button, Col, Modal, Row} from "react-bootstrap";
import React from "react";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";

const LeaveGroupModal = (props,
                         group,
                         profileUsername,
                         editGroup,
                         activeGroupId,
                         state) => {
  const handleLeave = (event) => {
    event.preventDefault();
    console.log(state)
    group.members.pop(profileUsername)
    editGroup(group);
  }

  return(
        <Modal {...props} animation={false} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Leave this Group?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>You will lose your progress from this group if you leave. You can only rejoin if an existing member
              invites you.
              </p>
            </Modal.Body>
          <Modal.Footer>
                <Row>
                    {/*TODO: figure out layout*/}
                    <Col xs={6}>
                        <Button variant="info" onClick={props.onHide}>
                            No, go back!
                        </Button>
                    </Col>
                    <Col xs={6}>
                        {/*TODO: nee to make creat chore validate and submit data*/}
                        <Button variant="danger" onClick={handleLeave}>
                            Yes, delete
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
  )
};

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    // TODO: eventually groups will be actually populated
    group : state.groups.filter(group => group.id === state.activeGroupId)[0],
    profileUsername : state.profile.username,
    state: state
})

const dtpm = (dispatch) => ({
    getGroupData : (profile, groupId) => applicationActions.getGroupData(dispatch, profile, groupId),
    deleteChore : (group, choreId) => applicationActions.deleteChore(dispatch, group, choreId),
    createChore : (groupId, chore) => applicationActions.createChore(dispatch, groupId, chore),
    editGroup: (group) => applicationActions.editGroup(dispatch, group)
})

export default connect(stpm, dtpm)(LeaveGroupModal);