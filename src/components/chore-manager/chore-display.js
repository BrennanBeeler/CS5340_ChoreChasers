import React from "react";
import {Col, Row} from "react-bootstrap";
import ChoreCard from "./chore-card";
import "./chore-display.css"


const ChoreDisplay = ({chores, deleteChore, updateProgress}) => {

    const findOverdue = () => {
        return chores.filter(chore => (chore.dueDate !== null && chore.dueDate < new Date()))
            .sort((a, b) => {
                if (a.dueDate < b.dueDate) {
                    return -1
                } else {
                    return 1
                }
            });
    }

    return(
        <div>
            <div className="border-top border-dark hero">
                <Row>
                    <Col xs={6} style={{paddingLeft: "30px", paddingRight : "30px"}}>
                        {/*TODO: break up chores by date*/}

                        {
                            findOverdue().length !== 0 &&
                            <>
                                <h3>
                                    Overdue
                                </h3>
                                <br/>
                                {
                                    findOverdue().map(chore =>
                                        <div key={chore.id}>
                                            <ChoreCard chore={chore} deleteChore={deleteChore}
                                                       updateProgress={updateProgress}/>
                                                <br/>
                                        </div>)
                                }
                            </>
                        }

                        <h3>
                            Due Today
                        </h3>

                        <br/>

                        {
                            chores.filter(chore => chore.dueDate !== null && chore.dueDate > new Date()).sort((a, b) => {
                                if(a.dueDate < b.dueDate) {
                                    return -1
                                }
                                else {
                                    return 1
                                }
                            }).map(chore => {
                                    return (
                                        <div key={chore.id}>
                                            <ChoreCard chore={chore} deleteChore={deleteChore}
                                                       updateProgress={updateProgress}/>
                                            <br/>
                                        </div>)
                                }
                            )
                        }
                    </Col>

                    <Col xs={6} style={{paddingRight: "30px", paddingLeft: "30px"}}>
                        <h3>
                            Undated Chores
                        </h3>

                        <br/>

                        {
                            chores.filter(chore => chore.dueDate === null).map(chore =>
                                <div key={chore.id}>
                                    <ChoreCard chore={chore} deleteChore={deleteChore}
                                               updateProgress={updateProgress}/>
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
