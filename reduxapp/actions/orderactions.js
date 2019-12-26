export const getOrders = () => ({
    type: 'GET_ORDERS' 
});

export const getOrdersByFilter = (expression) => ({
    type: 'GET_ORDERS_BY_FILTER',
    expression 
});


 