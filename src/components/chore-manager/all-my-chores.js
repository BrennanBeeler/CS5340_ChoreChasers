import React from "react";
import "./all-my-chores.css";
import {ProgressBar} from "react-bootstrap";
import CreateChoreModal from "../create-chore/create-chore-modal"
import ChoreDisplay from "./chore-display";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import ShowCompletedToggle from "./show-completed-toggle";
import LogOutModal from "../logout/logout-modal";

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
            showLogOutModal: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }

    handleDelete(chore) {
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
        const newCompleted = this.state.completedChores + magnitude;
        this.setState({completedPoints: newPoints, completedChores: newCompleted})
    }


    render() {
        return (
            <div className="container-fluid">
                <CreateChoreModal key={new Date().getTime() + 15}
                                  show={this.state.choreModal}
                                  hide={() => this.setState({choreModal: false})}
                                  profileUsername={this.state.profileUsername}
                />
                <h4 className="h4-style">
                    Today's Progress
                </h4>
                <p/>
                <div>
                    <a className="log-out-personal-btn" onClick={() => this.setState({showLogOutModal: true})}>Log Out</a>
                </div>
                <ProgressBar>
                    <ProgressBar variant="success" now={this.state.completedChores/this.props.chores.length *100} key={1}/>
                </ProgressBar>
                {this.state.completedChores}/{this.props.chores.length} Tasks
                <p/>

                <LogOutModal show={this.state.showLogOutModal}
                             hide={() => this.setState({...this.state, showLogOutModal: false})}/>

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
        if (group.members.includes(targetUser)) {
            group.chores.forEach(chore => {
                if (chore.assignees.includes(targetUser)) {
                    assignedChores.push({
                        ...chore,
                        members : group.members
                    })
                }
            })
        }
    })
    return assignedChores
}

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    chores : (state.activeProfile.chores).concat(sortForAssignee(state.groups, state.activeProfile.username)),
    profileUsername : state.activeProfile.username,
    state: state
})

const dtpm = (dispatch) => ({
    deletePersonalChore : (chore) => applicationActions.deletePersonalChore(dispatch, chore),
    deleteChore : (chore) => applicationActions.deleteChore(dispatch, chore)
})

export default connect(stpm, dtpm)(AllMyChores);