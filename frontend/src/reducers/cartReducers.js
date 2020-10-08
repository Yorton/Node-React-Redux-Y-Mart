import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT} from '../constants/cartConstants';

function cartReducer(state={cartItems: [], shipping: {}, payment: {}}, action){
    switch (action.type){
        case CART_ADD_ITEM:
            const modifyCartItem = action.payload;
            const existCartItem = state.cartItems.find(x => x.product === modifyCartItem.product);
            if (existCartItem){
                
                //modifyCartItem is exist in original cartItems whose qty could be modify and update that
                return {...state, 
                        cartItems: state.cartItems.map(x => x.product === existCartItem.product ? modifyCartItem :　x)};
            }

            ///modifyCartItem is not exist in original cartItems and need to add that
            return {...state, 
                    cartItems: [...state.cartItems, modifyCartItem]};
        case CART_REMOVE_ITEM:

            return {...state, 
                    cartItems: state.cartItems.filter(x => x.product !== action.payload)};

        case CART_SAVE_SHIPPING:
            return  {...state, 
                     shipping: action.payload};

        case CART_SAVE_PAYMENT:
            return  {...state, 
                    payment: action.payload};
            
        default:
            return state;
    }
}

export {cartReducer};