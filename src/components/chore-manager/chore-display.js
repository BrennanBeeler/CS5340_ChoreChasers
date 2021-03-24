import React, {useEffect} from "react";
import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";

const ChoreDisplay = ({
                        activeGroup
                      }) => {

    useEffect(() => {
    //    TODO: get chores from database and populate each column based on if has a due date

    })

    return(
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

                    </Col>

                    <Col xs={6}>
                        <h3>
                            Undated Chores
                        </h3>
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
