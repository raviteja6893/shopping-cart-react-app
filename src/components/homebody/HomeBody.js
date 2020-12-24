import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './HomeBody.css';

class Body extends React.Component {

  state = {
      products: [],
      cartid: 0,
      userid: (this.props.location && this.props.location.state && this.props.location.state.username) || null,
  }
    componentDidMount() {
        axios.get('http://localhost:8080/')
          .then(response => {
            this.setState({ products: response.data });
          });
      }
      handleClick(item_id){
        axios.get('http://localhost:8080/users/'+this.state.userid).then(response=>{
          if(response.cart_id!==null){
            this.setState({ cartid: response.cart_id});
            axios.get('http://localhost:8080/cart'+this.state.cartid).then(response=>{
                axios.put('http://localhost:8080/cart',{quantity: (response.quantity)+1});
            })
          }
          else{  
            axios.post('http://localhost:8080/cart', {item_id: this.item_id,cart_id: this.state.cartid})  
            .then(response => {console.log(response);})
            .catch(error => {
            console.log(error);})  
          }
        })
        .catch(error => {
        console.log("User Doesn't Exist");})  
      }
    render() { 
        return ( 
            <div className="body">
                <h1>
                    MY ITEMS:
                </h1>
                <ul>
                    {this.state.products.map(item => (
                    <li>
                        <ul>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <input type="button" value="Add To Cart" onClick={() => this.handleClick(this,item.item_id)}/>
                        </ul>
                    </li>    
                    ))}
                </ul>
            </div>
         );
    }
}
 
export default withRouter(Body);