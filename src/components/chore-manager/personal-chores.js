import React from "react";
import "./personal-chores.css"

const PersonalChores = () => {
    return(
        <div className="container-fluid">
            <div className="row">
                Today's Progress



            </div>


            <div className="progress hci-personal-progress-div">
                <div className="progress-bar hci-personal-progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                     aria-valuemax="100">
                    0/1
                </div>
            </div>
            <br/>
        </div>
    )
}

export default PersonalChores;