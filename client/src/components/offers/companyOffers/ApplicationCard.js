import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { timestampParser } from '../../utils';
// import StudentDetails from './StudentDetails';

const ApplicationCard = ({application}) => {
    const students = useSelector( state => state.allStudentsReducer);
    const [student, setStudent]= useState([]);
    // const [displayProfile, setDisplayProfile] = useState(false)

    useEffect(()=>{
        if( students[0]){
            setStudent( students.filter( student => (student._id === application.studentId))[0])
        }
    },[students, application])
    console.log(student.picture)

    

    return (
            <div>
                <img src={student.picture} alt="pic" style={{width: "30px" , height: "30px"}}/>
                <span> <b>Student</b> :{student.firstname + " "+ student.lastname} </span>
                <span> <b>Statut</b> : {application.status} </span> 
                <span> <b>Déposée le</b> : {timestampParser(application.timestamp)} </span>
                {/* <span> <button onClick={(e=>setDisplayProfile(true))}>Profil</button></span> */}
            </div>
    )
}

export default ApplicationCard
