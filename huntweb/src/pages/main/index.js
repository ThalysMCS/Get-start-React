import React, {Component} from 'react';
import api from "../../services/api";
import "./styles.css";
import {Link} from 'react-router-dom';
export default class Main extends Component{

    state = {
        products:[],
        productsInfo:{},
        page: 1, 
    };
    componentDidMount(){
        this.loadProducts();
    }
    loadProducts = async (page = 1) =>{
        const response = await api.get(`/products?page=${page}`);

        const {docs,...productsInfo} = response.data;

        this.setState({products:docs,productsInfo,page});
    };
    prevPage = () =>{
        const { page , productsInfo } =  this.state;

        if(page === 1 )return;

        const pageNumber = page -1 ;

        this.loadProducts(pageNumber);
    };
    
    nextPage = () =>{
        const { page , productsInfo } =  this.state;

        if(page === productsInfo.pages)return;
            const pageNumber = page +1;
            this.loadProducts(pageNumber);
        
    }

    render(){
        const {products, page,productsInfo} = this.state;

        return (
            <div className="product-list">
                {products.map(product =>(
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <buttons disabled={page === 1 } onClick={this.prevPage}>
                      Anterior
                    </buttons>
                    <buttons disabled={page === productsInfo.pages} onClick={this.nextPage}>
                      Proxima
                    </buttons>
                </div>
            </div>
        );
    }
}