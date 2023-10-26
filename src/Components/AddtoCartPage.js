import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DRECEMENT, REMOVEITEM, getCartTotal } from "../redux/Slice/cartSlice";
import { ADDTOCART } from "../redux/Slice/cartSlice";

function AddtoCart() {
  const { cart, items, totalQuantity, totalPrice } = useSelector(
    (state) => state.all
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
    console.log("totalQuantity is", totalQuantity);
    console.log("TotalPrice  is", totalPrice);
  }, [cart]);

  console.log("carts conphouahscu", cart);
  return (
    <div>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart -{cart.length} items</h5>
                </div>
                <div className="card-body">
                  {/* {cart.map((data)=>{ */}

                  {/* <!-- Single item --> */}
                  {cart.map((data) => {
                    return (
                      <>
                        {/* // <!-- Single item --> */}
                        <div key={data.id} className="row">
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            {/* <!-- Image --> */}
                            <div
                              className="bg-image hover-overlay hover-zoom ripple rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img src={data.imgdata} className="w-100" />
                              <a href="#!">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundcolor: "rgba(251, 251, 251, 0.2)",
                                  }}
                                ></div>
                              </a>
                            </div>
                            {/* <!-- Image --> */}
                          </div>

                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            {/* <!-- Data --> */}
                            <p>
                              <strong>Restaurent : </strong>
                              {data.rname}
                            </p>
                            <p>
                              <strong>Rating : </strong>
                              {data.rating}
                              <i className="fas fa-star" />
                            </p>
                            <p>
                              <strong>Dishes :</strong>
                              {data.address}
                            </p>
                            <button
                              type="button"
                              className="btn  btn-sm me-1 mb-2"
                              data-mdb-toggle="tooltip"
                              title="Remove item" onClick={()=>{dispatch(REMOVEITEM(data.id))}}
                            >
                              <i className="fas fa-trash"></i>
                            </button>

                            <Link to={`/cart/${data.id}`}>
                              <button
                                type="button"
                                className="btn btn-success btn-sm mb-2"
                                data-mdb-toggle="tooltip"
                                title="Move to the wish list"
                              >
                                Product Details
                              </button>
                            </Link>
                            {/* <!-- Data --> */}
                          </div>

                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            {/* <!-- Quantity --> */}
                            <div
                              className="d-flex mb-4"
                              style={{ maxwidth: "300px" }}
                            >
                              <button
                                className="btn btn-primary px-3 me-2"
                                onClick={() => {
                                  dispatch(DRECEMENT(data.id));
                                }}
                              >
                                <i className="fas fa-minus"></i>
                              </button>

                              <div className="form-outline">
                                <input
                                  name="quantity"
                                  value={data.qnty}
                                  type="number"
                                  className="form-control"
                                />
                                <label className="form-label">Quantity</label>
                              </div>

                              <button
                                onClick={() => {
                                  dispatch(ADDTOCART(data));
                                }}
                                className="btn btn-primary px-3 ms-2"
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            {/* <!-- Quantity --> */}

                            {/* <!-- Price --> */}
                            <p className="text-start text-md-center">
                              <strong> {data.qnty * data.price}₹ </strong>
                            </p>
                            {/* <!-- Price --> */}
                          </div>
                        </div>
                        <hr className="my-4" />
                      </>
                    );
                  })}

                  {/* <!-- Single item --> */}

                  {/* })} */}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Details</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Quantity
                      <span>{totalQuantity}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>{totalPrice}</strong>
                      </span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    back to Home page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddtoCart;
