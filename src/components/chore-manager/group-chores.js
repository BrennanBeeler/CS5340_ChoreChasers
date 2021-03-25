import React from "react";
import ChoreDisplay from "./chore-display";
import {Link} from "react-router-dom";

const GroupChores = () => {
    return(
        <div className="container-fluid">
            <div className="row">
                Today's Progress



            </div>


            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                     aria-valuemax="100">
                    0%
                </div>
                <div className="progress-bar bg-success" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                     aria-valuemax="100">
                    0%
                </div>
                <div className="progress">
                    <div className="progress-bar bg-info" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100">
                        0%
                    </div>
                </div>
            </div>
            <br/>
            <Link to="/groupSettings" className="btn btn-info">
              Group Settings
            </Link>

            <ChoreDisplay></ChoreDisplay>
        </div>
    )
}

export default GroupChores;