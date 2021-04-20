import React from "react";
import {Modal, Button, Row, Col} from "react-bootstrap";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";

const LogOutModal = ({hide, show, logOut}) => {

    function redirectLogout() {
        logOut()
        hide()
    }

    return (
        <Modal onHide={hide} animation={false} show={show} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Are you sure you want to log out of ChoreChasers?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Row style={{width: "100%"}}>
                    <Col xs={6}>
                        <Button variant="success" block onClick={hide}>
                            No, I want to stay!
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button variant="danger" block onClick={redirectLogout}>
                            Yes, I want to log out!
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

const stpm = (state, ownProps) => ({
    hide: ownProps.hide,
    show: ownProps.show
})

const dtpm = (dispatch) => ({
    logOut : () => applicationActions.logOut(dispatch)
})

export default connect(stpm, dtpm)(LogOutModal);