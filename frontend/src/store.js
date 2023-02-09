import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, newProductReducer ,productDetailsReducer, newReviewReducer } from './reducers/productReducers';
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer } from './reducers/orderReducers';

const reducers = combineReducers({
    products: productsReducer,
    newProduct: newProductReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {}
    }
};

const middleware = [thunk];
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;