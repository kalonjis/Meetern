import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOffer } from '../../../actions/offer.action';


    
    const CreateForm = ()=>{
        const company =  useSelector((state)=> state.companyReducer);
        const [position, setPosition] = useState('');
        const [description, setDescription] = useState('');
        const [hiringPossibility, setHiringPossibility] = useState('');
        const [internshipStart, setInternshipStart] = useState('');
        const [internshipDuration, setInternshipDuration] = useState('');
        const [internshipPlace, setInternshipPlace] = useState('');
        const [faceToface, setFaceToface] = useState('');
        const dispatch = useDispatch();
        
        const handleSubmit = (e)=>{
            e.preventDefault()
            dispatch(addOffer(company._id,
                position,
                description,
                hiringPossibility,
                internshipStart,
                internshipDuration,
                internshipPlace,
                faceToface)
                )
                document.location.reload();// mauvaise pratique=> temporaire!!!
            }

        return(
            <form className='CreateOffer-form' onSubmit={handleSubmit}>
                    <label htmlFor="position" ><h4>position</h4> </label>                 
                    <input
                        type="text"
                        name="position"
                        id="position"
                        onChange={(e)=> setPosition(e.target.value)}
                    />
                    <br/><br/>
                    <label htmlFor="description" ><h4>description</h4> </label>                 
                    <input
                        type="text"
                        name="description"
                        id="description"
                        onChange={(e)=> setDescription(e.target.value)}
                    />
                    <br/><br/>
                    <label htmlFor="hiringPossibility" ><h4>hiringPossibility</h4> </label>                 
                    <input
                        type="text"
                        name="hiringPossibility"
                        id="hiringPossibility"
                        onChange={(e)=> setHiringPossibility(e.target.value)}
                    />
                    <br/><br/>
                    <label htmlFor="internshipStart" ><h4>internshipStart</h4> </label>                 
                    <input
                        type="text"
                        name="internshipStart"
                        id="internshipStart"
                        onChange={(e)=> setInternshipStart(e.target.value)}
                    />
                    <br/><br/>
                    <label htmlFor="internshipDuration" ><h4>internshipDuration</h4> </label>                 
                    <input
                        type="text"
                        name="position"
                        id="internshipDuration"
                        onChange={(e)=> setInternshipDuration(e.target.value)}
                    />
                    <br/><br/>
                    <label htmlFor="internshipPlace" ><h4>internshipPlace</h4> </label>                 
                    <input
                        type="text"
                        name="internshipPlace"
                        id="internshipPlace"
                        onChange={(e)=> setInternshipPlace(e.target.value)}
                    />
                    <br/><br/>
                    <label htmlFor="faceToface" ><h4>faceToface</h4> </label>                 
                    <input
                        type="text"
                        name="faceToface"
                        id="faceToface"
                        onChange={(e)=> setFaceToface(e.target.value)}
                    />
                    <br/><br/>
                    <button type="submit" > Valider</button>
                </form> 
        )
    } 
    export default CreateForm;
