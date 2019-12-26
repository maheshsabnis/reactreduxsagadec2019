// define Action Types
// constants those will contain the action name
export const ADD_PRODUCT = 'ADD_PRODUCT';
// define Action Creators
// function that will accept the payload
// will return the JSON with ActionType and
// the updated payload

export function addProduct(product){
    // write logic for actoin creator
    // ajax call

    console.log(`Inside the action method ${JSON.stringify(product)}`);
    return {
        type: ADD_PRODUCT, // dispatched action 
        product
    }
}