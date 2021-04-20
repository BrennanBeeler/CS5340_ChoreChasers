import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import ChoreCard from "./chore-card";
import "./chore-display.css"
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";


const ChoreDisplay = ({chores, background, deleteChore, updateProgress, showCompleted}) => {
    const style = {
        backgroundImage: "url("+background+")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "calc(100vh - 190px)",
    }

    const [overdueChores, setOverdueChores] = useState([]);
    const [todayChores, setTodayChores] = useState([]);
    const [weeksChores, setWeeksChores] = useState([]);
    const [futureChores, setFutureChores] = useState([]);
    const [undatedChores, setUndatedChores] = useState([]);

    const sortChore = () => {
        let overdueTemp = [];
        let todayTemp = [];
        let weeksTemp = [];
        let futureTemp = [];
        let undatedTemp = [];

        chores.forEach(chore => {
            if (showCompleted) {
                if(chore.dueDate === null) {
                    undatedTemp.push(chore)
                }
                else if (new Date(chore.dueDate).getTime() < new Date(new Date().toISOString().substring(0, 10)).getTime()) {
                    overdueTemp.push(chore)
                }
                else if (chore.dueDate === new Date().toISOString().substring(0, 10)) {
                    todayTemp.push(chore)
                }
                else if (new Date(chore.dueDate).getTime() < new Date(new Date().toISOString().substring(0, 10)).getTime() + 604800000) {
                    weeksTemp.push(chore)
                }
                else {
                    futureTemp.push(chore)
                }
            }
            else {
                if (!chore.done) {
                    if(chore.dueDate === null) {
                        undatedTemp.push(chore)
                    }
                    else if (new Date(chore.dueDate).getTime() < new Date(new Date().toISOString().substring(0, 10)).getTime()) {
                        overdueTemp.push(chore)
                    }
                    else if (chore.dueDate === new Date().toISOString().substring(0, 10)) {
                        todayTemp.push(chore)
                    }
                    else if (new Date(chore.dueDate).getTime() < new Date(new Date().toISOString().substring(0, 10)).getTime() + 604800000) {
                        weeksTemp.push(chore)
                    }
                    else {
                        futureTemp.push(chore)
                    }
                }
            }
        })

        setUndatedChores(undatedTemp)
        setOverdueChores(overdueTemp)
        setFutureChores(futureTemp)
        setTodayChores(todayTemp)
        setWeeksChores(weeksTemp)
    }

    useEffect(() => {
        sortChore(chores)
    }, [chores])

    return(
        <div style={{height: "calc(100vh - 190px"}}>
            <div className="hero vertical-scrollable" style={style}>
                <Row>
                    <Col xs={6} style={{paddingLeft: "30px", paddingRight : "30px"}}>
                        {
                            (overdueChores.length === 0 && todayChores.length === 0 && weeksChores.length === 0
                                && futureChores.length === 0) &&
                                <div className="text-center">
                                    <h2 className="h2-undated">
                                        Dated Chores
                                    </h2>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    Chores with due dates assigned up here!
                                </div>

                        }


                        <>
                            {
                                overdueChores.length !== 0 &&
                                <>
                                    <h2 className="h2-dated text-center">
                                        Overdue
                                        <i className="fa fa-exclamation-triangle"
                                              style={{color: "red", marginLeft: "10px"}} />
                                    </h2>
                                    <br/>
                                </>
                            }
                            {
                                overdueChores.map(chore => {
                                    return( <div key={chore.id}>
                                        <ChoreCard chore={chore} deleteChore={deleteChore}
                                                   updateProgress={updateProgress}/>
                                        <br/>
                                    </div>)
                                })
                            }
                        </>
                        {
                            todayChores.length !== 0 &&
                            <>
                                <h2 className="h2-due-today text-center">
                                    Due Today
                                </h2>
                                <br/>
                            </>
                        }

                        {
                            todayChores.map(chore => {
                                return (
                                    <div key={chore.id}>
                                        <ChoreCard chore={chore} deleteChore={deleteChore}
                                                   updateProgress={updateProgress}/>
                                        <br/>
                                    </div>)
                            })
                        }
                        {
                            weeksChores.length !== 0 &&
                            <>
                                <h2 className="h2-due-next-week text-center">
                                    Due Next Week
                                </h2>

                                <br/>
                            </>
                        }


                        {
                            weeksChores.map(chore => {
                                return (
                                    <div key={chore.id}>
                                        <ChoreCard chore={chore} deleteChore={deleteChore}
                                                   updateProgress={updateProgress}/>
                                        <br/>
                                    </div>
                                )

                            })
                        }
                        {
                            futureChores.length !== 0 &&
                            <>
                                <h2 className="h2-due-future text-center">
                                    Due In The Future
                                </h2>

                                <br/>
                            </>
                        }

                        {
                            futureChores.map(chore => {
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
                        {
                            undatedChores.length === 0 ?
                                <div className="text-center">
                                    <h2 className="h2-undated">
                                        Undated Chores
                                    </h2>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    Chores without assigned due dates end up here!
                                </div>
                                :
                                <h2 className="h2-undated text-center">
                                    Undated Chores
                                </h2>
                        }

                        <br/>

                        {
                            undatedChores.map(chore =>
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
    background: state.activeProfile.background,
    props: ownProps,
    showCompleted: state.showCompleted
})

const dtpm = (dispatch) => ({
    setBackground : (url) => applicationActions.setBackground(dispatch, url)
})

export default connect(stpm, dtpm)(ChoreDisplay);
