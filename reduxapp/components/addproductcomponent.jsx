import React, { Component } from 'react';
class AddProductComponent extends Component {
     constructor(props){
          super();  
          this.state = {
              ProductName : ''
          };
     }
    save() {
        // define a product object
        let product  ={};
        // read data from UI elements and save to product object
        product.ProductId = this.refs.productId.value;
        product.ProductName = this.refs.productName.value;
        this.setState({'ProductName': product.ProductName});
        // initiate the dispatch from here
         this.props.addProductRequest(product);   
        // clear textboxes
        this.refs.productId.value = '';
        this.refs.productName.value = '';
    } 
    render() { 
        return (
            <div className="container">
              <div className="form-group">
                <label>Product Id</label>
                <input type="text" ref="productId" className="form-control"/>
              </div>
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" ref="productName" className="form-control"/>
              </div>
              <div className="form-group">
                 <input type="button" value="Save"
                  onClick = {this.save.bind(this)}
                 className="btn btn-success"/>
              </div>
            </div>
        );
    }
}
 
export default AddProductComponent;