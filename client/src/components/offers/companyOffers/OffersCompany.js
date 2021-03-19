import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOffer, getOffer } from '../../../actions/offer.action';
import OfferDetails from './OfferDetails';


const OffersCompany = () =>{
    const company =  useSelector((state)=> state.companyReducer);
    const allOffers = useSelector((state)=> state.allOffersReducer);
    const myOffers = allOffers.filter((offer)=> (offer.companyId === company._id))
    const [createForm, setCreateForm] = useState(false);
    const [offerDetails, setOfferDetails] = useState(false);
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [hiringPossibility, setHiringPossibility] = useState('');
    const [internshipStart, setInternshipStart] = useState('');
    const [internshipDuration, setInternshipDuration] = useState('');
    const [internshipPlace, setInternshipPlace] = useState('');
    const [faceToface, setFaceToface] = useState('');
    const dispatch = useDispatch();
    const [detailsId, setDetailsId] = useState(null)
    
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
            setCreateForm(false)
            document.location.reload();// mauvaise pratique=> temporaire!!!
        }
    
    const showDetails = (offerId) =>{
        setOfferDetails(true);
        dispatch(getOffer(offerId))
        setDetailsId(offerId)
    }

    return (
        <div className="offers-company-container">
            <h1>Welcome to the company offer page</h1>            
            { createForm === false && offerDetails === false &&(
                <>
                <button onClick={(e)=> setCreateForm(true)}> Add an offer</button>
                <div> 
                    <h2>Your offers list</h2> 
                    <ol>               
                        { myOffers.map((offer) => {
                            return(
                                 <li key={offer._id} onClick={(e)=>{showDetails(offer._id)} }>
                                     {offer.position}
                                </li>
                                ) 
                            })
                        }                       
                    </ol>
                </div>
             </>
            )}
            { createForm === false && offerDetails &&(
                <div> <OfferDetails offerId={detailsId}/> <button onClick={(e)=> setOfferDetails(false)}>close</button></div>
            )}
            { createForm && ( 
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
                    <button onClick={(e)=> setCreateForm(false)}> Annuler </button>
                </form> 
            )}
        </div>
    )
}
export default OffersCompany