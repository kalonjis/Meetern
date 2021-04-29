import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateOfferForm from '../CreateOfferForm';
import OfferCard from '../../OfferCard';
import { Link } from 'react-router-dom';
import './OffersCompany.css';
import Select from 'react-select';

const OffersCompany = () =>{
    const company =  useSelector((state)=> state.companyReducer);
    const allOffers = useSelector((state)=> state.allOffersReducer);
    const [myOffers, setMyOffers] = useState([]);
    const [addOffer, setAddOffer] = useState(false);
    const [filter, setFilter] = useState({
        value: 0,
        label: "all"
    })
    const filterOption = [
        {
            value: 0,
            label: "all"
        },
        {
            value: 1,
            label: "open"
        },
        {
            value: 2,
            label: "closed"
        },
        {
            value: 3,
            label: "confirmed"
        }
    ]

    useEffect(()=>{
        if(allOffers[0]){
            return setMyOffers(allOffers.filter(offer => offer.companyId === company._id))
        }
    },[allOffers, company])

    const filterOffer = ( offerStatus) =>{
        if (offerStatus.label === "all"){
            return setMyOffers(allOffers.filter(offer => offer.companyId === company._id))
        }
        setMyOffers(allOffers.filter(offer => offer.companyId === company._id && offer.status === offerStatus.label))
    }

    const handleChange =(obj)=>{
        setFilter(obj)
    }
    return (
        <div className="offers-company-page-container">
            <h1>Welcome to the company offer page</h1>
            { addOffer === false &&(
                <div className="offers-company-list-section">
                    <h2>Your offers list 
                    
                        <span> <button onClick={ e=> setAddOffer(true)}> ADD an OFFER</button></span>
                    </h2> 
                    <div className="offers-filter">
                        <div className=" offers-type-selector">
                        <Select
                            value = {filter}
                            options={filterOption}
                            onChange = {handleChange}
                            // isDisabled = {option => option.isDisabled}
                            // getOptionLabel ={ option => option.name}
                        />
                        </div>
                        <button onClick={ e => filterOffer(filter)}> Filter</button>
                    </div>
                    
                    <ul className="offers-company-list-container">
                        {
                            myOffers.map( offer=> (
                                <li key={offer._id} className="offerCard-company-container">
                                    <OfferCard  offer={offer} />
                                    <div className="offerCard-company-container-bottom"> 
                                        <button><Link to={`/offers/${offer._id}`}>View</Link></button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )}
            {addOffer &&(
                <div className="create-offer-form-container">
                    <button onClick={ e=> setAddOffer(false)} >Cancel</button>
                    <CreateOfferForm />
                    <button onClick={ e=> setAddOffer(false)} >Cancel</button>
                </div>
            )}
        </div>
    )
}
export default OffersCompany;