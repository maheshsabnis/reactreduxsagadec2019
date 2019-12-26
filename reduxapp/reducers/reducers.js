import {ADD_PRODUCT} from './../actions/actions';
import { combineReducers } from "redux";

// redecer if a pure function that accepts state
// and return state
// combine all redecuers in an aggrigation so that.
// they can handle state for global store aka application store

export function addProductReducer(state, action) {
    console.log(`In Add Product Reducer and action is ${action.type}
    and data in store is ${JSON.stringify(state)}`);
    switch(action.type) {
        case ADD_PRODUCT:
              return {
                  product: action.product
              }
        default: 
                return state;    
    }  
}
// reducer that will return the complete state with array
export function listProductsReducer(state = [], action){
    console.log(`In List Product Reducer and action is ${action.type}
    and data in store is ${JSON.stringify(state)}`);
    switch(action.type) {
        case ADD_PRODUCT:{
                return  [...state, addProductReducer(undefined, action)]
                }
                  default: 
                return state;    
    }
}


const productsReducer = combineReducers({
    listProductsReducer
});

export default productsReducer;