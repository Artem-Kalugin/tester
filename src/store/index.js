import { applyMiddleware, createStore } from 'redux';
import UserReducer from './user-reducer';
import thunkMiddleware from 'redux-thunk';

export const store = createStore(UserReducer, applyMiddleware(thunkMiddleware));

export default UserReducer;
