import React, { Component } from 'react';
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    SelectionMode,
    IColumn
  } from "office-ui-fabric-react/lib/DetailsList";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import { getOrders,getOrdersByFilter } from '../../actions/orderactions';


import {connect} from  'react-redux'


const classNames = mergeStyleSets({
    fileIconHeaderIcon: {
      padding: 0,
      fontSize: "16px"
    },
    fileIconCell: {
      textAlign: "center",
      selectors: {
        "&:before": {
          content: ".",
          display: "inline-block",
          verticalAlign: "middle",
          height: "100%",
          width: "0px",
          visibility: "hidden"
        }
      }
    },
    fileIconImg: {
      verticalAlign: "middle",
      maxHeight: "16px",
      maxWidth: "16px"
    },
    controlWrapper: {
      display: "flex",
      flexWrap: "wrap"
    },
    exampleToggle: {
      display: "inline-block",
      marginBottom: "10px",
      marginRight: "30px"
    },
    selectionDetails: {
      marginBottom: "20px"
    }
  });
  const controlStyles = {
    root: {
      margin: "0 30px 20px 0",
      maxWidth: "300px"
    }
  };
 
class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           criteria:[
               'OrderId',
               'CustomerName',
               'EmployeeName',
               'ShipperName',
               'ShipCity',
               'ShipCountry'
           ],
           searchCriteria:'' ,
           searchText:'',
           fieldToSearch: '',
           checked: false,
           orders:[],
           filterorders:[],
           data: {Expression:''}, //Expression: City=London
           columns: [
            {
              key: "column1",
              name: "Order Id",  
              fieldName: "OrderId",
              minWidth: 116,
              maxWidth: 116 
            },
            {
              key: "column2",
              name: "Customer Name",
              fieldName: "CustomerName",
              minWidth: 210,
              maxWidth: 350,
              isRowHeader: true,
              isResizable: true,
              isSorted: true,
              isSortedDescending: false,
              sortAscendingAriaLabel: "Sorted A to Z",
              sortDescendingAriaLabel: "Sorted Z to A",
              data: "string",
              isPadded: true
            },
            {
              key: "column3",
              name: "Employee Name",
              fieldName: "EmployeeName",
              minWidth: 70,
              maxWidth: 90,
              isResizable: true,
              data: "string",
              isPadded: true
            },
            {
              key: "column4",
              name: "Order Date",
              fieldName: "OrderDate",
              minWidth: 70,
              maxWidth: 90,
              isResizable: true,
              isCollapsible: true,
              data: "Date",
              isPadded: true
            },
            {
              key: "column5",
              name: "Required Date",
              fieldName: "RequiredDate",
              minWidth: 70,
              maxWidth: 90,
              isResizable: true,
              isCollapsible: true,
              data: "Date" 
            },
            {
              key: "column6",
              name: "Shipper Name",
              fieldName: "ShipperName",
              minWidth: 70,
              maxWidth: 90,
              isResizable: true,
              isCollapsible: true,
              data: "string" 
            },
            {
              key: "column7",
              name: "Ship City",
              fieldName: "ShipCity",
              minWidth: 70,
              maxWidth: 90,
              isResizable: true,
              isCollapsible: true,
              data: "string" 
            },
            {
              key: "column8",
              name: "Ship Country",
              fieldName: "ShipCountry",
              minWidth: 70,
              maxWidth: 90,
              isResizable: true,
              isCollapsible: true,
              data: "string" 
            }
          ]
        };
    }

   

    handleSearchChange =(evt) => {
        this.setState({'searchText': evt.target.value}, ()=>{
            this.doWork();
         //   console.log(this.state.searchText);
            if(this.state.fieldToSearch.length < 0 || this.state.fieldToSearch === 'undefined' ){
                alert('Please select the Field to Search');
            }else{
                    //            CustomerName==Hari
                let fullSearch = `${this.state.fieldToSearch}==${this.state.searchText}`;
                this.setState({'searchCriteria':fullSearch.trim()},()=>{
                this.doWork();
       //         console.log(this.state.searchCriteria);
                // data = {Express:CustomerName==Hari}
                this.state.data.Expression = this.state.searchCriteria;
               //console.log(` in handle Search Change ${JSON.stringify( this.state.data)}`);
            });
        }
            
        });
       
    }
    doWork =() =>{}
    searchData = () => {
     console.log(JSON.stringify(this.state.data));
     this.props.getOrdersByFilter(this.state.data);
     this.setState({'searchText': ''});
    }
    handleradioChange = (evt) =>{
        this.setState({'fieldToSearch':evt.target.value});
    }
     
    render() { 
      
     if(this.props.orders) {
       this.state.orders = this.props.orders;
     }
     if(this.props.filterorders) {
      this.state.orders = this.props.filterorders;
     }
      return ( 
            <div className="container">
                <h2>Select Search Criteria</h2>
                 <div>
                  <table className="table table-bordered table-striped">
                    <tbody>
                      <tr>
                      {
                        this.state.criteria.map((c,i)=>(
                            <td key={i}>
                            <label key={i}>
                             <input type="radio" 
                             name="r"
                             key={i} id={i} value={c}
                             defaultChecked={this.state.checked}
                             onChange={this.handleradioChange.bind(this)}
                             className="form-control"/>
                                 {c}
                            </label>
                            </td>
                        ))
                    }
                      </tr>
                    </tbody>
                  </table>
                  
                   <div className="container">
                     <label> <strong>Enter Search Text </strong> </label>
                      <input type="text" value={this.state.searchText} 
                      onChange={this.handleSearchChange.bind(this)}
                      className="form-control"/>
                   </div>
                   <input type="button" value="Search" 
                   onClick={()=>this.props.getOrdersByFilter(this.state.data.Expression)} className="btn btn-success"/>
                 </div>
                 <hr/>
                 
                 <DetailsList
                 items={this.state.orders}
                 columns={this.state.columns}
                 setKey="multiple"
                 isHeaderVisible={true}
                 selectionPreservedOnEmptyClick={true}
                 enterModalSelectionOnTouch={true}
                 ariaLabelForSelectionColumn="Toggle selection"
                 ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                 checkButtonAriaLabel="Row checkbox"
               />
            </div>
         );
    }
}

function mapDispatchToProps(dispatch) {
   return { 
    getOrdersByFilter : (data) => {
     dispatch(getOrdersByFilter(data))
    }
  }
};

 

function  mapStateToProps(mstate)  {
  return {
    orders: mstate.orders,
    filterorders: mstate.filterorders
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(SearchComponent);