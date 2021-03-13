import {combineReducers} from 'redux';

import companyReducer from './company.reducer';
import studentReducer from './student.reducer';
import allOffersReducer from './allOffers.reducer';

export default combineReducers({
    companyReducer,
    studentReducer,
    allOffersReducer
})