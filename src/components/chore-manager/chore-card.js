import React, {useState} from "react";
import {Button, FormCheck, Navbar} from "react-bootstrap";
import applicationActions from "../../actions/actions";
import {connect} from "react-redux";

const ChoreCard = ({chore, addPoints}) => {
    const [toggleText, setToggleText] = useState(0);
    const toggleTextStr = ["View", "Hide"];

    return(
        <Navbar bg="light" expand="xs">
            <Navbar.Text>
                <h3>
                    {chore.choreName}
                </h3>

                <FormCheck style={{position: "absolute", top: "10px", right: "10px"}} onClick={() => addPoints(parseInt(chore.points))}/>

                Reward:
                {
                    (chore.rewards.points === true) &&
                    <div style={{paddingLeft: "10px"}}>
                        Points: {chore.points}pts
                    </div>
                }

                {
                    (chore.rewards.realLifeItem === true) &&
                    <div style={{paddingLeft: "10px"}}>
                        Real Life Reward: {chore.realLifeItem}
                    </div>
                }

            </Navbar.Text>

            <Navbar.Toggle
              style={{position: "absolute", bottom: "10px", right: "10px"}}
              onClick={() => setToggleText(1 - toggleText)}>
                {toggleTextStr[toggleText]} Details
            </Navbar.Toggle>

            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Text>
                    Due Date: {chore.dueDate.toDateString()}
                    <br/>
                    <br/>
                    Chore Description: {chore.choreInstructions}
                    <br/>
                    <br/>
                    Assignor:
                    <br/>
                    <br/>
                    Date Added:
                    <br/>
                    <br/>
                    Assignees:
                </Navbar.Text>

                <br/>

                <div style={{paddingBottom: "50px"}}>
                    <Button style={{marginRight: "15px"}}>
                        Edit Chore
                    </Button>
                    <Button variant="danger">
                        Delete Chore
                    </Button>
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

const stpm = (state, ownProps) => ({
    profile: state.profile,
    props: ownProps
})

const dtpm = (dispatch) => ({
    addPoints: (points) => {applicationActions.addPoints(dispatch, points)}
})

export default connect(stpm, dtpm)(ChoreCard);
