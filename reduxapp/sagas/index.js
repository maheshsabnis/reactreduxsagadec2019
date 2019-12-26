import { put, all, takeLatest, takeEvery, call } from "redux-saga/effects";
import axios from 'axios';
//import { takeEvery } from "redux-saga";
// import { takeLatest } from "redux-saga";

function getAllProducts() {
    const json = fetch('https://apiapptrainingnewapp.azurewebsites.net/api/Products')
        .then(resp => resp.json());

    return Promise.resolve(json);
}

// the method executed for GET_PRODUCTS, this will 
// call the Promise returning method by resolving it using 'call()'
// once resolve the data will be delived by invoking PRODUCTS_RECEIVED action
// using put()
function* fetchProducts() {
    let prds = [];
    console.log('inside fetch product saga');

    // resolved JSON data aftre the ajax call
    const request = yield call(getAllProducts);
    console.log(`Fetch Products ${request}`);
    // using put() invoke the 'PRODUCTS_RECEIVED' aaction
    yield put({
        type: 'PRODUCTS_RECEIVED',
        json: request || [{ error: 'Error Occured' }]
    });
}

function* actionWatcher() {
    // monitor GET_PRODUCTS action and execute fetchProducts method
    console.log('in action watcher saga');
    yield takeLatest("GET_PRODUCTS", fetchProducts);
    // yield takeEvery("GET_PRODUCTS", fetchProducts);
}
// the saga generator to watcher
export default function* rootSaga() {
    console.log('in root saga');
    yield all([
        actionWatcher(), // the method that will be watched by rootSaga and response will yield
    ]);
}