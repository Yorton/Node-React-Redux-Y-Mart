import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import cookie from 'js-cookie';

import {productListReducer, 
        productDetailsReducer, 
        productSaveReducer, 
        productDeleteReducer,
        productReviewSaveReducer} from './reducers/productReducers';

import {cartReducer} from './reducers/cartReducers';

import {userSigninReducer, 
        userRegisterReducer,
        userUpdateReducer} from './reducers/userReducers';

import {orderCreateReducer,
        orderDetailsReducer,
        orderPayReducer,
        myOrderListReducer,
        orderListReducer,
        orderDeleteReducer} from './reducers/orderReducers';

const cartItems = cookie.getJSON("cartItems") || [];
const userInfo = cookie.getJSON("userInfo") || null;

const initialState = {cart: {cartItems, shipping: {}, payment: {}}, 
                      userSignin: {userInfo}};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productReviewSave: productReviewSaveReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer
    , initialState
    , composeEnhancer(applyMiddleware(thunk)));

export default store;