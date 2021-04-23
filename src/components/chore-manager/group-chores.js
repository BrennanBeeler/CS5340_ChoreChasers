import React from "react";
import "./group-chores.css"
import LogOutModal from "../logout/logout-modal";
import ChoreDisplay from "./chore-display";
import {Link} from "react-router-dom";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";
import CreateChoreModal from "../create-chore/create-chore-modal";
import {ProgressBar} from "react-bootstrap";
import ShowCompletedToggle from "./show-completed-toggle";

class GroupChores extends React.Component {
    constructor(props) {
        super(props);
        let completedPoints = 0;
        let totalPoints = 0;

        let members = {};
        const {group} = this.props;
        group.members.map(member => members[member] = 0);

        group.chores.map(chore => {
            const multiplier = chore.assignees.length > 0 ? chore.assignees.length : 1
            totalPoints += chore.points * multiplier;
            if (chore.done) {
                for (const member of chore.assignees)
                {
                    members[member] += chore.points;
                }
            }
        });

        const colors = ['success', 'danger', 'warning', 'info'];
        this.state = {
            choreModal: false,
            showLogOutModal:false,
            completedPoints,
            totalPoints,
            members,
            colors,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }


    updateProgress(points) {
        const temp = this.state.members;
        temp[this.props.profileUsername] += points;
        this.setState({members: temp});
    }

    handleDelete(chore) {
        this.props.deleteChore(chore)
    }

    render() {
        const {members} = this.state;
        return(
            <div className="container-fluid">
                <div style={{height: "160px"}}>
                    <div className="row">

                        <CreateChoreModal key={new Date().getTime() + 15} show={this.state.choreModal}
                                          hide={() => this.setState({choreModal: false})}
                                          profileUsername={this.props.profileUsername}
                                          createChore={this.props.createChore}/>

                        <div className="col col-xxl-10 group-settings-header-div">
                            <h4 className="h4-style">
                                Group Progress
                            </h4>
                        </div>

                        <div className="col col-auto">
                            <Link to="/groupSettings" className="">
                                View Group Settings
                            </Link>
                        </div>
                    </div>

                    <div>
                        <a className="log-out-group-btn" onClick={() => this.setState({showLogOutModal: true})}>Log Out</a>
                    </div>
                    <LogOutModal show={this.state.showLogOutModal}
                                 hide={() => this.setState({...this.state, showLogOutModal: false})}/>
                    <p/>
                    {this.props.group.progressBar ? <ProgressBar>
                        {Object.keys(members).map((member, index) => {
                            return (<ProgressBar animated={true} variant={this.state.colors[index % 4]} label={member}
                                                 now={members[member] / this.state.totalPoints * 100} key={index}/>)
                        })
                        }
                    </ProgressBar> : <br/>}
                    <p/>

                    <div className="row">
                        <div className="col-xl-4 group-name-style">
                            <h1 className="h1-style">
                                {this.props.group.name}
                            </h1>
                        </div>
                        <div className="col col-xl-5 create-chore-btn-div-group">
                            <button className=" create-chore-btn btn btn-info mt-2 mb-1 pt-2 pb-2"
                                    onClick={() => this.setState({choreModal: true})}>
                                Add a New Chore
                                <i className="fa fa-plus" style={{paddingLeft: "10px"}}/>
                            </button>
                        </div>

                        <div className=" col col-auto show-completed-toggle-group">
                            <ShowCompletedToggle/>
                        </div>
                    </div>
                </div>


                <br/>
                <div className="chore-display-box"></div>


                <ChoreDisplay key={new Date().getTime()}
                              chores={this.props.group.chores}
                              deleteChore={this.handleDelete}
                              updateProgress={this.updateProgress}/>
            </div>
        )}
}

const stpm = (state) => ({
    activeGroupId: state.activeGroupId,
    activeProfile: state.activeProfile,
    group : state.groups.filter(group => group.id === state.activeGroupId)[0],
    profileUsername : state.activeProfile.username
})

const dtpm = (dispatch) => ({
    getGroupData : (profile, groupId) => applicationActions.getGroupData(dispatch, profile, groupId),
    deleteChore : (chore) => applicationActions.deleteChore(dispatch, chore),
    createChore : (groupId, chore) => applicationActions.createChore(dispatch, groupId, chore)
})

export default connect(stpm, dtpm)(GroupChores);