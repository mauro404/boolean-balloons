import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, productDetailsReducer } from './reducers/productReducers';
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers';

const reducers = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer
});

let initialState = {};

const middleware = [thunk];
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;