import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {getProducts, deleteProduct} from './apiAdmin';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);


    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
          }
        })
    }

    const {user, token} = isAuthenticated();

    const destroy = (productId) => {
        deleteProduct(productId, user, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts();
            }
        })
    }


    useEffect(() => {
        loadProducts();
    },[])


    return (
        <Layout
            children
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Total {products.length} products</h2>
                    <hr/>
                    <ul className="list-group">
                       
                            {products.map((prod, idx) => (
                                 <li key={idx} 
                                 className="list-group-item d-flex justify-content-between align-items-center"
                                 >
                                
                                  <strong>{prod.name}</strong>
                                  <Link to={`/admin/product/update/${prod._id}`}>
                                    <span className="badge badge-warning badge-pill">Update</span>
                                  </Link>
                                  <span onClick={() => destroy(prod._id)} className="badge badge-danger badge-pill">Delete</span>
                                </li>
                            ))}
                        
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;
