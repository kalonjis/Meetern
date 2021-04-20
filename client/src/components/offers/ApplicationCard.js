import React from 'react';
import { timestampParser } from '../utils';

const ApplicationCard = ({application}) => {
   
    return (
            <div>
                <span> <b>Statut</b> : {application.status} </span> 
                <span> <b>Déposée le</b> : {timestampParser(application.timestamp)} </span>
            </div>
    )
}

export default ApplicationCard
