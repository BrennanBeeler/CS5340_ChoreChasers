import React, {useState} from "react";
import "./personal-chores.css"
import {Button, ProgressBar} from "react-bootstrap";
import CreateChoreModal from "../create-chore/create-chore-modal"
import ChoreDisplay from "./chore-display";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";

class PersonalChores extends React.Component {
    constructor(props) {
      super(props);
      let completedPoints = 0;
      let totalPoints = 0;

      //TODO: remove map- map needs return value
      this.props.chores.map(chore => {
        totalPoints += chore.points;
        if (chore.done) {
          completedPoints += chore.points;
        }
      });
      this.state = {
        choreModal: false,
        completedPoints,
        totalPoints,
      };
        this.handleDelete = this.handleDelete.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }

    handleDelete(choreId) {
        this.props.deletePersonalChore(choreId)
    }

    updateProgress(points) {
        const newPoints = this.state.completedPoints + points;
        this.setState({completedPoints: newPoints})
    }


    render() {
      return (
      <div className="container-fluid" style={{paddingLeft: 0, paddingRight: 0}}>
          <div style={{paddingLeft: "12px", paddingRight: "12px", paddingTop: "10px"}}>
              <div>
                  Today's Progress

                  <Button variant="primary" onClick={() => this.setState({choreModal: true})}>
                      Create Chore
                  </Button>
              </div>

              {/*TODO: evaluate temp fix for duplicate keys- +15*/}
              <CreateChoreModal key={new Date().getTime() + 15}
                                show={this.state.choreModal}
                                hide={() => this.setState({choreModal: false})}
                                profileUsername={this.state.profileUsername}
              />

              <ProgressBar>
                  <ProgressBar variant="success" now={this.state.completedPoints/this.state.totalPoints *100} key={1}/>
              </ProgressBar>
              <br/>

              <h1>
                  Personal Chores
              </h1>
          </div>


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
    chores : state.profile.chores,
    profileUsername : state.profile.username
})

const dtpm = (dispatch) => ({
    deletePersonalChore : (choreId) => applicationActions.deletePersonalChore(dispatch, choreId)
})

export default connect(stpm, dtpm)(PersonalChores);