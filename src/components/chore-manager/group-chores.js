import React from "react";

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
        </div>
    )
}

export default GroupChores;