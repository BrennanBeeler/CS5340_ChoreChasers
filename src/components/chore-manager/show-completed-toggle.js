import React from "react";
import {connect} from "react-redux";
import applicationActions from "../../actions/actions";

const ShowCompletedToggle = ({showCompleted, toggleShowCompleted}) => {

    return (
        <span className="form-check custom-control custom-switch">
            <input className="form-check-input custom-control-input" type="checkbox" id="showCompletedToggle" checked={showCompleted} onClick={() => toggleShowCompleted()}/>
            <label style = {{paddingLeft: "5px"}} className="form-check-label custom-control-label" htmlFor="showCompletedToggle">Show Completed Chores</label>
        </span>
    )
}

const stpm = (state) => ({
    showCompleted: state.showCompleted
})

const dtpm = (dispatch) => ({
    toggleShowCompleted : () => applicationActions.toggleShowCompleted(dispatch)
})

export default connect(stpm, dtpm)(ShowCompletedToggle);