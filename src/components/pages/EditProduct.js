import React, { Component } from 'react';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import Validator from '../../shared/FormValidator';
import Token from '../../shared/Token';

class EditProduct extends Component {
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
            redirect: null,
            showImage: true
        };
        
      }
    
      handleInputChange(event) {  
        const name = event.target.name;
        const value = event.target.value;
        if(event.target.name==="pimage"){
            this.setState({
                pimage: event.target.files[0],
                showImage: false
                
            });   
        }
        else{
            this.setState({[name]: value});
        }
        //this.setState({[name]: value});     
      }
      
    
      onCancel() {
        this.props.onCancel();
      }
            
        

      submitHandler(event) {
        //alert(this.token.authorization());
        event.preventDefault();  
        if(this.validator.validateInputs(this.state)) {
        const  id  = this.props.match.params.id;
        
       
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

            console.log(fdata);
            
            axios.post('http://localhost:8000/api/product/'+id, fdata, {
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
    componentDidMount(){
        this.getProduct();
    }
    getProduct(){
        const  id  = this.props.match.params.id;
        axios.get('http://localhost:8000/api/product/'+id, {
             headers: {
               Authorization: this.token.authorization()
             }
            })
            .then(response=>{
                //console.log(response.data.product);
                this.setState({
                    title:response.data.product.title, 
                    description:response.data.product.description,
                    price:response.data.product.price,
                    pimage:response.data.product.image
                });


            })
            .catch(error=>{
                //console.log(error);
                this.setState({error:error});
            });
    }  
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }

        //const product=this.state.product;

        
          
        return (
            <>
                
                <section className="sec product">
                    <div className="inner-wrapper">
                        <div className="form-container">
                        <h1>Edit Product</h1>
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
                                { this.state.showImage ? <><img src={this.state.pimage} alt="product" width="200"/><br/></>: null }
                                
                                <input type="file"  name="pimage" onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <input type="submit" name="submit" value="Edit Product"  />
                            </div>
                            
                            
                        </form>
                        </div>
                    </div>
                </section>
                
            </>
        );
    }
}

export default EditProduct;