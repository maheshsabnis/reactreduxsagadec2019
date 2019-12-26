import axios from 'axios';
export class OrderSrvice {
    constructor() {
        this.url = "http://localhost:12732/api/OrderDetail";
    }

    getData() {
        const resp = axios.get(`${this.url}/Get`);
        return resp;
    }

    getDataByExpression(expression) {
        const resp = axios.post(`${this.url}/Search`,JSON.stringify(expression), {
            headers: {
                'Content-Type': 'application/json'
            }   
        });
        return resp;
    }
}