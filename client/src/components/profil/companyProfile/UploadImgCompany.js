import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPictureCompany } from '../../../actions/company.action';

const UploadImg = ()=>{
    const [file, setFile] = useState('');
    const dispatch = useDispatch(); 
    const company = useSelector((state) => state.companyReducer);
    const errors = useSelector((state)=> state.errorReducer)

    // traitement à la soumission du form
    const handlePicture = (e)=>{
        e.preventDefault();
        const data = new FormData(); // "new FormData()" objet natif à JS - permet de stocker un fichier ('file') et ses infos
        data.append("name", company.companyName); // on lui attribue le nom du user
        data.append("companyId", company._id); // on lui associe l'id du user
        data.append("file", file); // le file = la photo sélectionnée

        dispatch(uploadPictureCompany(data, company._id))  // on envoie au store 
        console.log("image"+company._id)
    }


    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Changer d'image</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".jpg, .jpeg, .png" // affiche les types acceptés en front au moment de select l'image
              onChange={(e) =>setFile(e.target.files[0])}
            />
            <br/>
            <input type='submit' value="Envoyer" />
            {errors.companyErrors.format && <p>{errors.companyErrors.format}</p>}
            {errors.companyErrors.maxSize && <p>{errors.companyErrors.maxSize}</p>}
        </form>
    )
}

export default UploadImg