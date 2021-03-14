import {combineReducers} from 'redux';

import companyReducer from './company.reducer';
import studentReducer from './student.reducer';
import allOffersReducer from './allOffers.reducer';
import errorReducer from './error.reducer';


export default combineReducers({
    companyReducer,
    studentReducer,
    allOffersReducer,
    errorReducer
})