import React from "react";
import {Col, Row} from "react-bootstrap";
import ChoreCard from "./chore-card";


const ChoreDisplay = ({chores}) => {

    return(
        <div>
            <div className="border-top border-dark">
                <Row>
                    <Col xs={6}>
                        <h3>
                            Due Today
                        </h3>

                        <br/>

                        {
                            chores.map(chore => {
                                    return (
                                        <div key={chore.id}>
                                            <ChoreCard chore={chore}/>
                                            <br/>
                                        </div>)
                                }
                            )
                        }
                    </Col>

                    <Col xs={6}>
                        <h3>
                            Undated Chores
                        </h3>

                        <br/>

                        {
                            chores.map(chore =>
                                <div key={chore.id}>
                                    <ChoreCard chore={chore}/>
                                    <br/>
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ChoreDisplay;