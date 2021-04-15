import React from "react";
import "./personal-chores.css"
import {ProgressBar} from "react-bootstrap";
import CreateChoreModal from "../create-chore/create-chore-modal"
import ChoreDisplay from "./chore-display";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import ShowCompletedToggle from "./show-completed-toggle";

class PersonalChores extends React.Component {
    constructor(props) {
        super(props);
        let completedPoints = 0;
        let completedChores = 0;
        let totalPoints = 0;

        //TODO: remove map- map needs return value
        this.props.chores.map(chore => {
            totalPoints += chore.points;
            if (chore.done) {
                completedChores += 1;
                completedPoints += chore.points;
            }
        });
        this.state = {
            choreModal: false,
            completedPoints,
            totalPoints,
            completedChores,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }

    handleDelete(choreId) {
        this.props.deletePersonalChore(choreId)
    }

    updateProgress(points) {
        const newPoints = this.state.completedPoints + points;
        const newCompleted = this.state.completedChores + 1;
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
                <h4 className="h4-style">
                    Today's Progress
                </h4>
                <p/>
                <ProgressBar>
                    <ProgressBar variant="success" now={this.state.completedChores/this.props.chores.length *100} key={1}/>
                </ProgressBar>

                {this.state.completedChores}/{this.props.chores.length} Tasks
                <p></p>

                <div className="row">
                    <div className="personal-chore-name-style">
                        <h1 className="h1-style">
                            Personal Chores
                        </h1>
                    </div>


                    <div className="create-chore-btn-div-personal">
                        <button className=" create-chore-btn btn btn-info mt-2 mb-1 pt-2 pb-2"
                                onClick={() => this.setState({choreModal: true})}>
                            Add a New Chore
                            <i className="fa fa-plus" style={{paddingLeft: "10px"}}/>
                        </button>
                    </div>
                </div>

                <div className="show-completed-toggle-personal">
                <ShowCompletedToggle/>
                </div>

                <br/>

                <ChoreDisplay key={new Date().getTime()}
                              chores={this.props.chores}
                              deleteChore={this.handleDelete}
                              updateProgress={this.updateProgress}
                />
            </div>)
    }
}

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    chores : state.activeProfile.chores,
    profileUsername : state.activeProfile.username
})

const dtpm = (dispatch) => ({
    deletePersonalChore : (choreId) => applicationActions.deletePersonalChore(dispatch, choreId)
})

export default connect(stpm, dtpm)(PersonalChores);