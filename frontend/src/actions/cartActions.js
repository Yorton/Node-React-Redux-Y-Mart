import axios from 'axios';
import cookie from 'js-cookie';
import {CART_ADD_ITEM, 
        CART_REMOVE_ITEM, 
        CART_SAVE_SHIPPING,
        CART_SAVE_PAYMENT} from '../constants/cartConstants';

const addToCart = (productId, qty) => async (dispatch, getState) => {

    try{

        const {data} = await axios.get("/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });//modify cart data in reducer 

        const {cart: {cartItems}} = getState();
        cookie.set("cartItems", JSON.stringify(cartItems));

    }catch(error){

    }
}

const removeFromCart = (productId) => (dispatch, getState) =>{

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId
    });//modify cart data in reducer 

    const {cart: {cartItems}} = getState();
    cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) =>{

    dispatch({
        type: CART_SAVE_SHIPPING,
        payload: data
    });
}

const savePayment = (data) => (dispatch) =>{

    dispatch({
        type: CART_SAVE_PAYMENT,
        payload: data
    });
}



export {addToCart, removeFromCart, saveShipping, savePayment}