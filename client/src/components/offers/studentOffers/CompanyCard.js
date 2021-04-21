import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CompanyCard = ({id}) =>{
    const allCompanies = useSelector((state)=>state.allCompaniesReducer)
    const [company, setCompany] = useState([])

    useEffect(()=>{
        if(allCompanies){
            setCompany(allCompanies.filter( company => company._id === id)[0])
        }
    },[allCompanies, id])

    console.log(company)

    return(
        <div className="company-info" style={{border:  '2px solid blue', width:'30%'}}>
            <img src={window.location.origin + '/uploads/profil/companies/'+company.companyName +'.jpg'} alt="company-logo" style={{minWidth:50, maxWidth:200, width:150, height:150, minHeight:50, maxHeight:200}}/>
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
export default CompanyCard