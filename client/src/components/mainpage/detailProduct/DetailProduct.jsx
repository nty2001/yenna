import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GobalState } from "../../../GobalState";
import React from 'react'
import { Link } from "react-router-dom";
const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GobalState);
  const [products] = state.ProductsApi.products;
  const [detailProduct, setDetailProduct] = useState([]);
  useEffect(() => {
    if (params) {
        products.forEach((item) => {
          if (item._id === params.id) {
            setDetailProduct(item);
          }
        });
      }
  }, [params, products]);
  if (detailProduct.length === 0) return null;
  console.log(detailProduct.images);
  const addCart = state.UserApi.addCart;
  return (
    <>
      <div className="detail">
        <img src={detailProduct.images.url} alt="" />
        <div className="detail__box">
          <div className="detail__row">
            <h2>{detailProduct.title}</h2>
            <h6>{detailProduct.product_id}</h6>
          </div>
          <span>$ {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.contact}</p>
          <p>so luong {detailProduct.sold}</p>
          <Link to="/cart" className="cart" onClick={()=>addCart(detailProduct)}>
            Buy Now
          </Link>
        </div>
      </div>
     
    </>
  );
};

export default DetailProduct;
