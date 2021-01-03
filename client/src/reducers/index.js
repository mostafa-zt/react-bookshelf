import { combineReducers } from 'redux';
import bookReducer from './books_reducer';
import userReducer from './user_reducer';

const rootReducer = combineReducers({
    bookReducer,
    userReducer
});

export default rootReducer;