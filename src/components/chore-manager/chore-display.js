// import React from "react";
// import {Col, Row} from "react-bootstrap";
// import ChoreCard from "./chore-card";
// import "./chore-display.css"
// import applicationActions from "../../actions/actions";
// import {connect} from "react-redux";
//
//
// const ChoreDisplay = ({chores, background, deleteChore, updateProgress}) => {
//     return(
//         <div>
//             <div className="border-top border-dark hero" style={{backgroundImage: "url("+background+")"}}>
//                 <Row>
//                     <Col xs={6} style={{paddingLeft: "30px", paddingRight : "30px"}}>
//                         {/*TODO: break up chores by date*/}
//
//                         {
//                             console.log(chores)
//                         }
//
//
//                         <>
//                             {/*TODO: decide if we want to have overdue disappear*/}
//                             <h3>
//                                 Overdue
//                             </h3>
//                             <br/>
//                             {
//                                 chores.filter(chore => (chore.dueDate !== null && chore.dueDate < new Date().toDateString()))
//                                     .sort((a, b) => {
//                                         if (a.dueDate < b.dueDate) {
//                                             return -1
//                                         } else {
//                                             return 1
//                                         }
//                                     }).map(chore => {
//
//                                         return( <div key={chore.id}>
//                                             <ChoreCard chore={chore} deleteChore={deleteChore}
//                                                        updateProgress={updateProgress}/>
//                                             <br/>
//                                         </div>)
//                                     }
//                                    )
//                             }
//                         </>
//
//
//                         <h3>
//                             Due Today
//                         </h3>
//
//                         <br/>
//
//                         {
//                             chores.filter(chore => chore.dueDate !== null && chore.dueDate > new Date().toDateString())
//                                 .sort((a, b) => {
//                                     if(a.dueDate < b.dueDate) {
//                                         return -1
//                                     }
//                                     else {
//                                         return 1
//                                     }
//                                 }).map(chore => {
//                                     return (
//                                         <div key={chore.id}>
//                                             <ChoreCard chore={chore} deleteChore={deleteChore}
//                                                        updateProgress={updateProgress}/>
//                                             <br/>
//                                         </div>)
//                                 })
//                         }
//                     </Col>
//
//                     <Col xs={6} style={{paddingRight: "30px", paddingLeft: "30px"}}>
//                         <h3>
//                             Undated Chores
//                         </h3>
//
//                         <br/>
//
//                         {
//                             chores.filter(chore => chore.dueDate === null).map(chore =>
//                                 <div key={chore.id}>
//                                     <ChoreCard chore={chore} deleteChore={deleteChore}
//                                                updateProgress={updateProgress}/>
//                                     <br/>
//                                 </div>
//                             )
//                         }
//                     </Col>
//                 </Row>
//             </div>
//         </div>
//     )
// }
//
// const stpm = (state, ownProps) => ({
//     background: state.profile.background,
//     props: ownProps
// })
//
// const dtpm = (dispatch) => ({
//     setBackground : (url) => applicationActions.setBackground(dispatch, url)
// })
//
// export default connect(stpm, dtpm)(ChoreDisplay);

import React from "react";
import {Col, Row} from "react-bootstrap";
import ChoreCard from "./chore-card";
import "./chore-display.css"
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";


const ChoreDisplay = ({chores, background, deleteChore, updateProgress}) => {
    return(
        <div>
            <div className="border-top border-dark hero" style={{backgroundImage: "url("+background+")"}}>
                <Row>
                    <Col xs={6} style={{paddingLeft: "30px", paddingRight : "30px"}}>
                        {/*TODO: break up chores by date*/}

                        {
                            console.log(chores)
                        }


                        <>
                            {/*TODO: decide if we want to have overdue disappear*/}
                            <h3>
                                Overdue
                            </h3>
                            <br/>
                            {
                                chores.filter(chore => (chore.dueDate !== null && chore.dueDate < new Date().toDateString()))
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


                        <h3>
                            Due Today
                        </h3>

                        <br/>

                        {
                            chores.filter(chore => chore.dueDate !== null && chore.dueDate > new Date().toDateString())
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

const stpm = (state, ownProps) => ({
    background: state.profile.background,
    props: ownProps
})

const dtpm = (dispatch) => ({
    setBackground : (url) => applicationActions.setBackground(dispatch, url)
})

export default connect(stpm, dtpm)(ChoreDisplay);

