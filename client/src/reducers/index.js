import {combineReducers} from 'redux';

import companyReducer from './company.reducer';
import studentReducer from './student.reducer';
import allOffersReducer from './allOffers.reducer';
import errorReducer from './error.reducer';
import offerReducer from './offer.reducer';


export default combineReducers({
    companyReducer,
    studentReducer,
    allOffersReducer,
    errorReducer,
    offerReducer
});