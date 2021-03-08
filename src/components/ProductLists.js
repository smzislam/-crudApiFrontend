import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import Token from '../shared/Token';
  

class ProductLists extends React.Component{

    constructor(){
        super();
        this.token = new Token();
        this.state={
            products:[],
            redirect: null
        }
    }

    edit(product){
        alert(product.id);
        this.setState({ redirect: '/edit_product/'+product.id});
    }
    
    delete(product){
       
        axios.delete(`http://localhost:8000/api/product/${product.id}`, {
             headers: {
               Authorization: this.token.authorization()
             }
            })
            .then(response=>{
                console.log(response.data);
                //this.setState({products:response.data.products});
                //window.location.reload(false);
                this.getAllProduct();

            })
            .catch(error=>{
                console.log(error);
                //this.setState({error:error});
            });
        
    }

    componentDidMount(){
        this.getAllProduct();
    }

    getAllProduct(){
        axios.get('http://localhost:8000/api/product', {
             headers: {
               Authorization: this.token.authorization()
             }
            })
            .then(response=>{
                console.log(response.data.products);
                this.setState({products:response.data.products});


            })
            .catch(error=>{
                //console.log(error);
                this.setState({error:error});
            });
    }

    render (){

        const products=this.state.products;

        const allProducts=products.map((product)=>
           
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                    <img src={product.image} alt="Product"/></td>
                <td>
                    <button onClick={this.edit.bind(this, product)}>Edit</button>&nbsp;
                    <button onClick={this.delete.bind(this, product)}>delete</button>
                </td>
            </tr>
          
        );
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return( 
            <section className="sec product">
                <div className="inner-wrapper">
                    <h1>All Products &nbsp;|&nbsp;<Link to="add_product">Add Product</Link></h1>
                    <table className="ptable">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProducts}
                        </tbody>
                    </table>
                    
                </div>
            </section>
         );       
    }
}
export default ProductLists;