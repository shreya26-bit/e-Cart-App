import React, { useState } from "react";
import Cardsdata from "./CardsData";
import { Link } from "react-router-dom";
import { ADDTOCART } from "../redux/Slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function Cards() {
  const carts = useSelector((state) => state.all);

  const dispatch = useDispatch();

  return (
    <>
      <div className="container">
        <h1 className="text-center">Add to Cart Projects</h1>
        <div className="d-flex row justify-content-center align-items-center cards-content">
          {Cardsdata.map((data) => {
            const { id, rname, imgdata, price } = data;
            return (
              <>
                {/* <Link  className ="link" style={{textDecoration:"none",color:"black" ,width:"25rem"}} to={`/cards/${id}`}> */}
                <div
                  key={id}
                  className=" mx-2 mt-4 "
                  style={{ width: "24rem", border: "none" }}
                >
                  <img
                    src={imgdata}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "16rem" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{rname}</h5>
                    <p className="card-text">Price: {price}rs</p>
                    <a
                      href="#"
                      className="btn btn-primary d-flex justify-content-center"
                      onClick={() => {
                        dispatch(ADDTOCART(data));
                      }}
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
                {/* </Link > */}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Cards;
