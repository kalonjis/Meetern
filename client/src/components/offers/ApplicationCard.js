import React from 'react';
import { timestampParser } from '../utils';

const ApplicationCard = ({application}) => {
   
    return (
            <div className="application-container">
                <p className="application-status"> <b>Status</b> : {application.status} </p> 
                <p className="application-date"> <b>Sent</b> : {timestampParser(application.timestamp)} </p>
            </div>
    )
}

export default ApplicationCard
