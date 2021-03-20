import React from 'react';
import { useSelector } from 'react-redux';

const CompanyDetails = () =>{

    const company = useSelector((state)=>state.detailsReducer)
    console.log(company)

    return(
        <div>
        <div> name : {company.companyName}</div>
        <div> bio: {company.bio}</div>
        <div> sector: {company.sector}</div>
        <div> companyType: {company.companyType}</div>
        <div> phone: {company.phone}</div>
        <div> website: {company.webSite}</div>
        <div> Dress Code: {company.corporateWear}</div>
        </div>
    )
}
export default CompanyDetails