import React from 'react';
import { timestampParser } from '../../utils';
import StudentCard from './StudentCard';

const ApplicationCard = ({application}) => {
   
    return (
            <div>
                <StudentCard id={application.studentId} />
                <span> <b>Statut</b> : {application.status} </span> 
                <span> <b>Déposée le</b> : {timestampParser(application.timestamp)} </span>
            </div>
    )
}

export default ApplicationCard
