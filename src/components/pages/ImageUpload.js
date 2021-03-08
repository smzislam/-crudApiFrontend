import React, { Component } from 'react';
import axios from 'axios';
import Token from '../../shared/Token';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.token = new Token();
        this.submitHandler = this.submitHandler.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            pimage:null
        };
      }

    handleInputChange(event) {

        //console.log(event.target.files[0]);
        this.setState({
            pimage: event.target.files[0]
            
        });       
    }
    submitHandler(event) {
        //alert(this.token.authorization());
        event.preventDefault();  
        const fd = new FormData();
        fd.append('pimage_link', this.state.pimage, this.state.pimage.name);

        
            // const data = {
            //     title: "image upload",
            //     description: "upload description",
            //     price: 33,
            //     image: fd
            // }
            console.log(fd);
            axios.post('http://localhost:8000/api/upImage', fd, /* {
                onUploadProgress: progressEvent=>{
                    console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
                }
            } ,  */{
                headers: {
                  Authorization: this.token.authorization()
                }
            })
            .then(response=>{
                console.log(response.data);
               //this.setState({products:response.data.products});
               //alert('success');

               //this.setState({ redirect: "/products" });

            })
            .catch(error=>{
                //console.log(error);
                this.setState({error:error});
            });

        
      }
    render() {
        return (
            <>
                
                <section className="sec product">
                    <div className="inner-wrapper">
                        <div className="form-container">
                        <h1>Add New Product</h1>
                        <form onSubmit={this.submitHandler}>
                
                            <div className="form-group">
                                <label className="field-image">Image:</label>
                                <input name="pimage" value={this.state.image} type="file" onChange={this.handleInputChange} />
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

export default ImageUpload;


