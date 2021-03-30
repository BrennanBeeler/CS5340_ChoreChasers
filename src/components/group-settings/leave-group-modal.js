import {Button, Col, Modal, Row} from "react-bootstrap";
import React,{useState} from "react";
import applicationActions from "../../actions/actions";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const LeaveGroupModal = ({props,
                         group,
                         profileUsername,
                         editGroup,
                          deleteGroup,
                         activeGroupId,
                         state}) => {
  const handleLeave = (event) => {
    event.preventDefault();
    group.members.pop(profileUsername)
    editGroup(group);
    //TODO: remove after T4
    deleteGroup(group);
    setLeave(true);
  }

  const [leave, setLeave] = useState(false);

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
                        <button to="/choreManager" className="btn btn-danger" onClick={handleLeave}>
                            Yes, delete
                        </button>
                      {
                        leave &&
                          <Redirect to="/choreManager"/>}
                      {leave && deleteGroup(group)
                      }
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
  )
};

const stpm = (state, ownProps) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    // TODO: eventually groups will be actually populated
    group : state.groups.filter(group => group.id === state.activeGroupId)[0],
    profileUsername : state.profile.username,
    state: state,
    props: ownProps
})

const dtpm = (dispatch) => ({
    editGroup: (group) => applicationActions.editGroup(dispatch, group),
    deleteGroup: (group) => applicationActions.deleteGroup(dispatch, group)
})

export default connect(stpm, dtpm)(LeaveGroupModal);