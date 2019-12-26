import React, { Component } from 'react';
import AddProductComponent from './components/addproductcomponent';
import ListProductsComponent from './components/listproductscomponent';

import {addProduct} from './actions/actions';
import {connect} from 'react-redux';


class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        // define the props for dispatching action from View
        const { dispatch, visibleproducts } =  this.props;
        return (
            <div className="container">
              <h2>React-Redux Application</h2> 
              <AddProductComponent addProductRequest={(product)=> dispatch(addProduct(product))}/>
              <hr/>
              <ListProductsComponent listProducts = {visibleproducts} />
            </div>
        );
    }
}

// write a function that will map the props for the component(s)
// inside the provider to the state received from the store
// the function will accept the state object
// that will contain data in it that will be updated (created)
// using redecure 
function mapStateToProps(state)  {
    console.log(`MapStateToPros ${JSON.stringify(state)}`);
    return {
        visibleproducts: state.listProductsReducer
    }
}
// connect the 'mapStateToProps' function with the MainComponent 
// brige the state from the store with Components so that all
// states, props for and from component will subscribe to the store
export default connect(mapStateToProps)(MainComponent);
