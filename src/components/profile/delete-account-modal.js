import {Button, Col, Modal, Row} from "react-bootstrap";
import React,{useState} from "react";
import applicationActions from "../../actions/actions";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const DeleteAccountModal = ({props,
                         logOut}) => {
  const handleLeave = (event) => {
    event.preventDefault();
    setLeave(true);
  }

  const [leave, setLeave] = useState(false);

  return(
        <Modal {...props} animation={false} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Delete your profile?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to permanently delete your profile? You will lose all of your chores and points.
              </p>
            </Modal.Body>
          <Modal.Footer>
                <Row style={{width: "100%"}}>
                    {/*TODO: figure out layout*/}
                    <Col xs={6}>
                        <Button variant="success" block onClick={props.onHide}>
                            No, go back!
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button className="btn btn-danger" block onClick={handleLeave}>
                            Yes, delete
                        </Button>
                      {
                        leave &&
                          <Redirect to="/"/>}
                      {leave // && logOut()
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
    group : state.groups.filter(group => group.id === state.activeGroupId)[0],
    profileUsername : state.activeProfile.username,
    state: state,
    props: ownProps
})

const dtpm = (dispatch) => ({
    logOut : () => applicationActions.logOut(dispatch)
})

export default connect(stpm, dtpm)(DeleteAccountModal);