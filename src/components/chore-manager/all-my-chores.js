import React from "react";
import "./personal-chores.css";
import {Button, ProgressBar} from "react-bootstrap";
import CreateChoreModal from "../create-chore/create-chore-modal"
import ChoreDisplay from "./chore-display";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import ShowCompletedToggle from "./show-completed-toggle";

class AllMyChores extends React.Component {
    constructor(props) {
        super(props);
        let completedPoints = 0;
        let totalPoints = 0;

        //TODO: remove map- map needs return value
        // this.props.chores.map(chore => {
        //     totalPoints += chore.points;
        //     if (chore.done) {
        //         completedPoints += chore.points;
        //     }
        // });
        this.state = {
            choreModal: false,
            completedPoints,
            totalPoints,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }

    handleDelete(choreId) {
        //TODO: implement deleting - currently uses id which isn't unique and because of nested nature of app.
        // reducer it can't function without database hook up
        console.log("Deleting Chores")
    }

    updateProgress(points) {
        const newPoints = this.state.completedPoints + points;
        this.setState({completedPoints: newPoints})
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
                    Today's Progress - FIGURE OUT IF I STAY HERE
                </h4>
                <p/>
                <ProgressBar>
                    <ProgressBar variant="success" now={this.state.completedPoints/this.state.totalPoints *100} key={1}/>
                </ProgressBar>

                <p/>

                <div className="personal-chore-name-style">
                    <h1 className="h1-style">
                        Personal Chores
                    </h1>
                </div>
                <div className="create-chore-btn-div">
                    <button className=" create-chore-btn btn btn-info mt-2 mb-1 pt-2 pb-2"
                            onClick={() => this.setState({choreModal: true})}>
                        Add a New Chore
                        <i className="fa fa-plus" style={{paddingLeft: "10px"}}/>
                    </button>
                </div>

                <ShowCompletedToggle/>

                <br/>
                <br/>
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
                assignedChores.push(chore)
            }
        })
    })
    return assignedChores
}

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    chores : (state.profile.chores).concat(sortForAssignee(state.groups, state.profile.username)),
    profileUsername : state.profile.username
})

const dtpm = (dispatch) => ({
    deletePersonalChore : (choreId) => applicationActions.deletePersonalChore(dispatch, choreId)
})

export default connect(stpm, dtpm)(AllMyChores);