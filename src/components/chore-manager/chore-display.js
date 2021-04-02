import React, {useEffect, useState} from "react";
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
        width: "100%",
        minHeight: "100vh"
    }

    const [overdueChores, setOverdueChores] = useState([]);
    const [todayChores, setTodayChores] = useState([]);
    const [weeksChores, setWeeksChores] = useState([]);
    const [futureChores, setFutureChores] = useState([]);
    const [undatedChores, setUndatedChores] = useState([]);


    useEffect(() => {
        sortChore(chores)
    }, [chores])

    const sortChore = () => {
        let overdueTemp = [];
        let todayTemp = [];
        let weeksTemp = [];
        let futureTemp = [];
        let undatedTemp = [];

        chores.forEach(chore => {
            if(chore.dueDate === null) {
                undatedTemp.push(chore)
            }
            else if (new Date(chore.dueDate).getTime() < new Date().getTime()) {
                overdueTemp.push(chore)
            }
            //TODO: fix this
            else if (new Date(chore.dueDate).getTime() < new Date().getTime() + 86400000) {
                todayTemp.push(chore)
            }
            else if (new Date(chore.dueDate).getTime() < new Date().getTime() + 604800000) {
                weeksTemp.push(chore)
            }
            else {
                futureTemp.push(chore)
            }
        })

        setUndatedChores(undatedTemp.sort((a, b) => {
            if(a.dueDate < b.dueDate) {
                return -1
            }
            else {
                return 1
            }
        }))
        setOverdueChores(overdueTemp)
        setFutureChores(futureTemp)
        setTodayChores(todayTemp)
        setWeeksChores(weeksTemp)
    }

    return(
        <div>
            <div className="border-top border-dark hero" style={style}>
                <Row>
                    <Col xs={6} style={{paddingLeft: "30px", paddingRight : "30px"}}>
                        <>
                            {/*TODO: decide if we want to have overdue disappear*/}
                            {
                                overdueChores.length !== 0 &&
                                    <>
                                        <h3 style={{color:"#be4782"}}>
                                            Overdue
                                        </h3>
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
                        <hr></hr>
                        {
                            todayChores.length !== 0 &&
                                <>
                                    <h3>
                                        Due Today
                                    </h3>
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
                        <hr></hr>
                        {
                            weeksChores.length !== 0 &&
                                <>
                                    <h3>
                                        Due Next Week
                                    </h3>

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
                        <hr></hr>

                        {
                            futureChores.length !== 0 &&
                                <>
                                    <h3>
                                        Due In The Future
                                    </h3>

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
                        <hr></hr>

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
