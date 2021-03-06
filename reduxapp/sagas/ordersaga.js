import { put, all,  take,  takeLatest, takeEvery, call } from "redux-saga/effects";
function getOrders() {
    let json = fetch('http://localhost:12732/api/OrderDetail/Get')
    .then(resp => resp.json());
   return Promise.resolve(json);
}

function getOrdersByFilter(expression) {
    console.log(` in call method ${JSON.stringify(expression)}`);
    let data = {
           Expression: expression 
    };
    console.log(`data = ${JSON.stringify(data)}`)
    let json = fetch ('http://localhost:12732/api/OrderDetail/Search',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp=>resp.json());
    return Promise.resolve(json);
}
function* actionWatcherbyfilter() {
    console.log('Filter action watcher 1');
    const data = yield take('GET_ORDERS_BY_FILTER');
     
    // resolved JSON data aftre the ajax call
    const response = yield call(getOrdersByFilter, data.expression);
    
    yield put({
        type: 'ORDERS_RECEIVED_BY_FILTER',
        json: response || [{ error: 'Error Occured' }]
    });
}

 


function* fetchOrders() {
    // resolved JSON data aftre the ajax call
    const response = yield call(getOrders);
    yield put({
        type: 'ORDERS_RECEIVED',
        json: response || [{ error: 'Error Occured' }]
    });
}

function* actionWatcher() {
    // monitor GET_ORDERS action and execute fetchOrders method
    yield takeLatest('GET_ORDERS', fetchOrders);
}







// the saga generator to watcher
export default function* rootSagaOrders() {
    yield all([
        actionWatcher(),actionWatcherbyfilter()
    ]);
}