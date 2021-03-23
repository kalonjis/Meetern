import React from 'react';
import { useSelector } from 'react-redux';

const CompanyDetails = () =>{

    const company = useSelector((state)=>state.detailsReducer)
    console.log(company)

    return(
        <div className="company-info" style={{border:  '2px solid blue', width:'30%'}}>
            <img src={company.picture} alt="user-pic" style={{minWidth:50, maxWidth:200, width:150, height:150, minHeight:50, maxHeight:200}}/>
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