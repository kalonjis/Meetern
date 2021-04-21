/**Module de gestion d'erreur relatifs à l'authentification */

module.exports.signUpErrors = (err) => {
    let errors = { companyName: '',firstname: '', lastname: '', email: '', password: ''}

    if (err.message.includes('companyName'))
        errors.companyName = "companyName trop court";

    if (err.message.includes('firstname'))
        errors.firstname = "firstname trop court";
    
    if (err.message.includes('lastname'))
        errors.lastname = "lastname trop court";
        
    if (err.message.includes('email'))
        errors.email = "Email incorrect";
    
    if (err.message.includes('password'))
        errors.password = "Le mot de passe doit faire 6 caractères minimum";

    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = 'Cet email est déjà enregistré';

    return errors
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}

    if (err.message.includes('email'))
        errors.email = "Email inconnu";
    
    if (err.message.includes('password'))
        errors.password = "Mot de passe incorrect";

    return errors
};

module.exports.uploadErrors = (err) => {
    let errors = { format: "", maxSize: ""};

    if (err.message.includes('invalid file'))
    errors.format = "Format incompatible";

    if (err.message.includes('max size'))
    errors.maxSize = "le fichier dépasse les 500ko";
 

    return errors
}