import React from "react";
import {Button, FormCheck, Navbar} from "react-bootstrap";

const ChoreCard = ({chore}) => {
    return(
        <Navbar bg="light" expand="xs">
            <Navbar.Text>
                <h3>
                    {chore.choreName}
                </h3>

                <FormCheck style={{position: "absolute", top: "10px", right: "10px"}}/>

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

            <Navbar.Toggle style={{position: "absolute", bottom: "10px", right: "10px"}}>Details</Navbar.Toggle>

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

export default ChoreCard;