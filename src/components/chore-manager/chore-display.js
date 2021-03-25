import React, {useEffect, useState} from "react";
import {Button,
    Col,
    FormCheck,
    Navbar,
    Row
} from "react-bootstrap";
import {connect} from "react-redux";
import Chore from "./chore.js";

const ChoreDisplay = ({
                        activeGroup
                      }) => {

    useEffect(() => {
    //    TODO: get chores from database and populate each column based on if has a due date

    })

    return (
        <div>

            <h1>
                {activeGroup}
            </h1>
            <div className="border-top border-dark">
                <Row>
                    <Col xs={6}>
                        <h3>
                            Due Today
                        </h3>

                        <br/>

                        <Chore/>

                        <br/>

                        <Chore/>

                        <br/>

                        {/*<Card>*/}
                        {/*    <Card.Body>*/}
                        {/*        <Card.Title>Chore Name</Card.Title>*/}
                        {/*        <FormCheck style={{position: "absolute", top: "10px", right: "10px"}}/>*/}
                        {/*        <Card.Text>*/}
                        {/*            <h6>Reward:</h6>*/}
                        {/*        </Card.Text>*/}
                        {/*        <Button variant="primary">Go somewhere</Button>*/}
                        {/*    </Card.Body>*/}
                        {/*</Card>*/}

                    </Col>

                    <Col xs={6}>
                        <h3>
                            Undated Chores
                        </h3>

                        <br/>

                        <Chore/>

                        <br/>

                        <Chore/>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

const stpm = (state) => ({
    activeGroup: state.activeGroup
})

const dtpm = (dispatch) => ({

})

export default connect(stpm, dtpm)(ChoreDisplay);
