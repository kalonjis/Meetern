import {combineReducers} from 'redux';

import companyReducer from './company.reducer';
import studentReducer from './student.reducer'

// import usersReducer from './usersReducer';
// import postReducer from './postReducer';
// import errorReducer from './errorReducer';
// import allPostsReducer from './allPostsReducer';
// import trendingReducer from './trendingReducer';




export default combineReducers({
    companyReducer,
    studentReducer
    // usersReducer,
    // postReducer,
    // errorReducer,
    // allPostsReducer,
    // trendingReducer

})