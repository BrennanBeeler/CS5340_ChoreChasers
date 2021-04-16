import React from "react";
import "./all-my-chores.css";
import {ProgressBar} from "react-bootstrap";
import CreateChoreModal from "../create-chore/create-chore-modal"
import ChoreDisplay from "./chore-display";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import ShowCompletedToggle from "./show-completed-toggle";

class AllMyChores extends React.Component {
    constructor(props) {
        super(props);
        let completedPoints = 0;
        let completedChores = 0;
        let totalPoints = 0;

        this.props.chores.forEach(chore => {
            totalPoints += chore.points;
            if (chore.done) {
                completedChores += 1;
                completedPoints += chore.points;
            }
        });
        this.state = {
            choreModal: false,
            completedPoints,
            completedChores,
            totalPoints,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }

    handleDelete(chore) {
        //TODO: implement deleting - currently uses id which isn't unique and because of nested nature of app.
        // reducer it can't function without database hook up
        console.log("Deleting Chores")
        if (chore.group === "Personal Chores") {
            this.props.deletePersonalChore(chore)
        }
        else {
            this.props.deleteChore(chore)
        }
    }

    updateProgress(points, undo) {
        const newPoints = this.state.completedPoints + points;
        const magnitude = undo ? -1 : 1;
        const newCompleted = this.state.completedChores + 1 * magnitude;
        this.setState({completedPoints: newPoints, completedChores: newCompleted})
    }


    render() {
        return (
            <div className="container-fluid">
                {/*TODO: evaluate temp fix for duplicate keys- +15*/}
                <CreateChoreModal key={new Date().getTime() + 15}
                                  show={this.state.choreModal}
                                  hide={() => this.setState({choreModal: false})}
                                  profileUsername={this.state.profileUsername}
                />
                {/*TODO: decide what to do with all chores and bar*/}
                <h4 className="h4-style">
                    Today's Progress
                </h4>
                <p/>
                <ProgressBar>
                    <ProgressBar variant="success" now={this.state.completedChores/this.props.chores.length *100} key={1}/>
                </ProgressBar>
                {this.state.completedChores}/{this.props.chores.length} Tasks
                <p/>

                <div className="row">
                    <div className="col-xl-auto ">
                        <h1 className="h1-style">
                            All My Assigned Chores
                        </h1>
                    </div>


                    <div className="col col-xl-auto create-chore-btn-div-all-chores">
                        <button className=" create-chore-btn btn btn-info mt-2 mb-1 pt-2 pb-2"
                                onClick={() => this.setState({choreModal: true})}>
                            Add a New Chore
                            <i className="fa fa-plus" style={{paddingLeft: "10px"}}/>
                        </button>
                    </div>

                    <div className="col col-xl-auto show-completed-toggle-all-chores">
                        <ShowCompletedToggle/>
                    </div>
                </div>

                {/*<div className="personal-chore-name-style">*/}
                {/*    <h1 className="h1-style">*/}
                {/*        All my assigned chores*/}
                {/*    </h1>*/}
                {/*</div>*/}
                {/*<div className="create-chore-btn-div">*/}
                {/*    <button className=" create-chore-btn btn btn-info mt-2 mb-1 pt-2 pb-2"*/}
                {/*            onClick={() => this.setState({choreModal: true})}>*/}
                {/*        Add a New Chore*/}
                {/*        <i className="fa fa-plus" style={{paddingLeft: "10px"}}/>*/}
                {/*    </button>*/}
                {/*</div>*/}

                {/*<ShowCompletedToggle/>*/}

                <br/>


                <ChoreDisplay key={new Date().getTime()}
                              chores={this.props.chores}
                              deleteChore={this.handleDelete}
                              updateProgress={this.updateProgress}
                />
            </div>
        )
    }
}

const sortForAssignee = (groups, targetUser) => {
    let assignedChores = []
    groups.forEach(group => {
        group.chores.forEach(chore => {
            if (chore.assignees.includes(targetUser)) {
                assignedChores.push({
                    ...chore,
                    members : group.members
                })
            }
        })
    })
    return assignedChores
}

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    chores : (state.activeProfile.chores).concat(sortForAssignee(state.groups, state.activeProfile.username)),
    profileUsername : state.activeProfile.username
})

const dtpm = (dispatch) => ({
    deletePersonalChore : (chore) => applicationActions.deletePersonalChore(dispatch, chore),
    deleteChore : (chore) => applicationActions.deleteChore(dispatch, chore)
})

export default connect(stpm, dtpm)(AllMyChores);