import React, { Component } from 'react';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import Validator from '../../shared/FormValidator';
import Token from '../../shared/Token';


class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.validator = new Validator();
        this.token = new Token();
        this.onCancel = this.onCancel.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            title:'',
            description:'',
            price:'',
            pimage:null,
            redirect: null
        };
      }
    
      handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        if(event.target.name==="pimage"){
            this.setState({
                pimage: event.target.files[0]
                
            });   
        }
        else{
            this.setState({[name]: value});
        }
           
      }
    
      onCancel() {
        this.props.onCancel();
      }
            
        

      submitHandler(event) {
        //alert(this.token.authorization());
        event.preventDefault();  

        

        if(this.validator.validateInputs(this.state)) {
            // const data = {
            //     title: this.state.title,
            //     description: this.state.description,
            //     price: this.state.price,
            //     image: this.state.image
            // }
            const fdata = new FormData();
            fdata.append('title', this.state.title)
            fdata.append('description', this.state.description)
            fdata.append('price', this.state.price)
            fdata.append('image', this.state.pimage)

            
            axios.post('http://localhost:8000/api/product', fdata, {
             headers: {
               Authorization: this.token.authorization()
             }
            })
            .then(response=>{
                console.log(response.data);
               //this.setState({products:response.data.products});
               alert('success');

               this.setState({ redirect: "/products" });

            })
            .catch(error=>{
                //console.log(error);
                this.setState({error:error});
            });

        }
      }

    //   renderRedirect = () => {
    //     if (this.state.redirect) {
    //       return <Redirect to='/products' />
    //     }
    //   }
      
    render() {
          if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return (
            <>
                
                <section className="sec product">
                    <div className="inner-wrapper">
                        <div className="form-container">
                        <h1>Add New Product</h1>
                        <form onSubmit={this.submitHandler}>
                            
                            <div className="form-group">
                                <label className="field-title">Title:</label>
                                <input value={this.state.title} type="text" name="title" required onChange={this.handleInputChange}  placeholder="Enter Title" />
                            </div>
                            <div className="form-group">
                                <label className="field-description">Description:</label>
                                <textarea value={this.state.description}  name="description" required onChange={this.handleInputChange} placeholder="Enter Description" />
                            </div>
                            <div className="form-group">
                                <label className="field-price">Price:</label>
                                <input value={this.state.price} type="text" name="price" required onChange={this.handleInputChange} placeholder="Enter Price" />
                            </div>
                            <div className="form-group">
                                <label className="field-image">Image:</label>
                                <input value={this.state.image} type="file" name="pimage"  onChange={this.handleInputChange}/>
                            </div>
                            <div className="form-group">
                                <input type="submit" name="submit" value="Add Product"  />
                            </div>
                            
                            
                        </form>
                        </div>
                    </div>
                </section>
                
            </>
        );
    }
}

export default AddProduct;