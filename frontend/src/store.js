import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, newProductReducer, productReducer, productDetailsReducer, newReviewReducer } from './reducers/productReducers';
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers';

const reducers = combineReducers({
    products: productsReducer,
    newProduct: newProductReducer,
    productReducer: productReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
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