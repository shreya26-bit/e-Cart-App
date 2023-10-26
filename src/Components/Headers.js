import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Headers() {
  const carts = useSelector((state) => state.all);
  console.log("Carts", carts);

  const dispatch = useDispatch();
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-purple mx-3">
            <h1 className="text-decoration-none text-purple mx-3">Foodifie</h1>
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light ">
              Home
            </NavLink>
          </Nav>

          <Badge badgeContent={carts.cart.length} color="primary">
            <Link style={{ textDecoration: "none" }} to={`/cart`}>
              {" "}
              <i
                class="fa-solid fa-cart-shopping text-light"
                style={{ fontSize: "23px", cursor: "pointer" }}
              ></i>
            </Link>
          </Badge>
        </Container>
      </Navbar>
    </>
  );
}

export default Headers;
