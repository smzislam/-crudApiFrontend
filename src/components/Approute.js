import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import News from './pages/News';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Notfound from './pages/Notfound';
import ImageUpload from './pages/ImageUpload';



class Approute extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/products" component={Product} /> 
                    <Route exact path="/add_product" component={AddProduct} /> 
                    <Route exact path="/edit_product/:id" component={EditProduct} /> 
                    <Route exact path="/image_upload" component={ImageUpload} /> 
                    <Route exact path="/News" component={News} /> 
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/privacy" component={Privacy} /> 
                    <Route exact path="/terms" component={Terms} />   
                    <Route component={Notfound} />  
                </Switch>
            </>
        );
    }
}

export default Approute;