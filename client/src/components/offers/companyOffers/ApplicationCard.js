import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { timestampParser } from '../../utils';

const ApplicationCard = ({application}) => {
    const students = useSelector( state => state.allStudentsReducer);
    const [student, setStudent]= useState([]);
    

    useEffect(()=>{
        if( students[0]){
            setStudent( students.filter( student => (student._id === application.studentId))[0])
        }
    },[students, application])

    return (
        <li>
            <span> <b>Student</b> :{student.firstname + " "+ student.lastname} </span>
            <span> <b>Statut</b> : {application.status} </span> 
            <span> <b>Déposée le</b> : {timestampParser(application.timestamp)} </span>
            <span> <button>Profil</button></span>
        </li>
    )
}

export default ApplicationCard
