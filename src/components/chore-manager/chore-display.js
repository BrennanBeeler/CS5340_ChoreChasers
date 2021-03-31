import React from "react";
import {Col, Row} from "react-bootstrap";
import ChoreCard from "./chore-card";
import "./chore-display.css"
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";


const ChoreDisplay = ({chores, background, deleteChore, updateProgress}) => {
    const style = {
        backgroundImage: "url("+background+")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }

    return(
        <div>
            <div className="border-top border-dark hero" style={style}>
                {/* use <p> tag to add smaller space than that of a <br> tag between border and chores*/}
                <p></p>
                <Row>
                    <Col xs={6} style={{paddingLeft: "30px", paddingRight : "30px"}}>
                        <>
                            {/*TODO: decide if we want to have overdue disappear*/}
                            <h3 class="font-weight-normal">
                                Overdue
                            </h3>
                            <br/>
                            {
                                chores.filter(chore => chore.dueDate !== null && new Date(chore.dueDate).getTime() < new Date().getTime())
                                    .sort((a, b) => {
                                        if (a.dueDate < b.dueDate) {
                                            return -1
                                        } else {
                                            return 1
                                        }
                                    }).map(chore => {
                                        return( <div key={chore.id}>
                                            <ChoreCard chore={chore} deleteChore={deleteChore}
                                                       updateProgress={updateProgress}/>
                                            <br/>
                                        </div>)
                                    }
                                   )
                            }
                        </>
                        <h3 class="font-weight-normal">
                            Due Today
                        </h3>

                        <br/>
                        {
                            chores.filter(chore => chore.dueDate !== null && new Date(chore.dueDate).getTime() >= new Date().getTime()
                                && new Date(chore.dueDate).getTime() < new Date().getTime() + 604800000)
                                .sort((a, b) => {
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
                                })
                        }

                        <h3 class="font-weight-normal">
                            Due Next Week
                        </h3>

                        <br/>


                        {
                            chores.filter(chore => chore.dueDate !== null
                                && new Date(chore.dueDate).getTime() >= new Date().getTime() + 604800000
                                && new Date(chore.dueDate).getTime() < new Date().getTime() + 7257600000)
                                .sort((a, b) => {
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
                            })
                        }

                        <h3 class="font-weight-normal">
                            Due In The Future
                        </h3>

                        <br/>

                        {
                            chores.filter(chore => chore.dueDate !== null && new Date(chore.dueDate).getTime() >= new Date().getTime()
                                && new Date(chore.dueDate).getTime() >= new Date().getTime() + 7257600000)
                                .sort((a, b) => {
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
                            })
                        }
                    </Col>

                    <Col xs={6} style={{paddingRight: "30px", paddingLeft: "30px"}}>
                        <h3 class="font-weight-normal">
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

const stpm = (state, ownProps) => ({
    background: state.profile.background,
    props: ownProps
})

const dtpm = (dispatch) => ({
    setBackground : (url) => applicationActions.setBackground(dispatch, url)
})

export default connect(stpm, dtpm)(ChoreDisplay);
