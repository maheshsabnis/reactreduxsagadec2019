 

const reducer = (state = {}, action) => {
   // console.log('Inside Reducer');
    switch (action.type) {
        case 'GET_ORDERS':
         //   console.log(`GET ORDERS ${JSON.stringify(state)}`);
            return {...state, loading: true };
        case 'ORDERS_RECEIVED':
            //  debugger;
          //  console.log(`ORDERS RECEIVED ${JSON.stringify(state)}`);
            return {...state, orders: action.json, loading: false };
        case 'GET_ORDERS_BY_FILTER':
            return {...state, loading: true };
        case 'ORDERS_RECEIVED_BY_FILTER':
                   //  debugger;
                  // console.log(`ORDERS RECEIVED BY FILTER ${JSON.stringify(state)}`);
            return {...state, filterorders: action.json, loading: false };    
        default:
            return state;
    }
};

 
export default reducer;