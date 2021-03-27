import React from "react";
import {Modal, Button, Row, Col} from "react-bootstrap";

const DeleteChoreModal = ({deleteChore, hide, show, choreId}) => {

    return (
        // TODO: had to set animation to false because of issue with react-bootstrap https://github.com/react-bootstrap/react-bootstrap/issues/5075
        <Modal onHide={hide} animation={false} show={show} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Delete Chore?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Row>
                    <Col xs={6}>
                        <Button variant="success" onClick={hide}>
                            No! Keep it!
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button variant="danger" onClick={() => deleteChore(choreId)}>
                            Yes, delete this chore!
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteChoreModal;