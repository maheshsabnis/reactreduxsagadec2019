import React, { Component } from 'react';
class ListProductsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="container">
              <h2>List of Products</h2>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                  </tr>
                </thead>
                <tbody>
                   {
                       this.props.listProducts.map((p,i) => (
                           <tr key={i}>
                                <td>{p.product.ProductId}</td>
                                <td>{p.product.ProductName}</td>
                           </tr>
                       ))
                   }
                </tbody>
              </table>
              <br/>
              <div></div>
            </div>
        );
    }
}
 
export default ListProductsComponent;