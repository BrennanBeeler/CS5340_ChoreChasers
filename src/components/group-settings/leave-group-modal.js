import {Button, Col, Modal, Row} from "react-bootstrap";
import React from "react";

const LeaveGroupModal = (props) => {
  const handleLeave = (event) => {
    event.preventDefault();
    // edit group and remove member
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
                        <Button variant="danger">
                            Yes, delete
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
  )
};

export default LeaveGroupModal;