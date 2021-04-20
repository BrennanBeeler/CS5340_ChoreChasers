import React from "react";
import {Modal, Button, Row, Col} from "react-bootstrap";

const LogOutModal = ({hide, show}) => {
    // function clicklogout(mybtn){
    //     // Do your stuff here with the clicked button
    //     // eslint-disable-next-line no-restricted-globals
    //     location.href='/';
    // };

    return (
        <Modal onHide={hide} animation={false} show={show} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Are you sure you want to log out of ChoreChasers?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Row>
                    <Col xs={6}>
                        <Button variant="success" onClick={hide}>
                            No, I want to stay!
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button variant="danger" onClick={window.location.href='/'}>
                            Yes, log out!
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

export default LogOutModal;