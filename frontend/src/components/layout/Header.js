import React, { Fragment } from "react";
import { Route, NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from 'react-alert'
import { logout } from "../../actions/userActions";

import "../../App.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons"

const Header = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    // alert.success('Logged out successfully.')
  };

  return (
    <Fragment>
      <Navbar collapseOnSelect expand="md" bg="light" variant="" style={{ padding: '1.5% 3%' }}>
        <>
          <Navbar.Brand href="/"><img className="" src="../../images/logo2.png" alt="logo" width='33px'/>boolean ballons</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <NavDropdown title={<FontAwesomeIcon icon={faUser}/>} id="collasible-nav-dropdown" align="end">
                    <NavDropdown.Item href="/me">Profile</NavDropdown.Item>
                    {/* <NavDropdown.Item href="/orders/me">Orders</NavDropdown.Item> */}
                    <NavDropdown.Item href="/" onClick={logoutHandler}>Logout</NavDropdown.Item>
                    { user && user.role === 'admin' && (
                    <><NavDropdown.Divider />
                    <NavDropdown.Item href="/dashboard" variant="primary">
                    Admin Dashboard
                    </NavDropdown.Item></>
                    )}
                </NavDropdown>
              ) : !loading && <Nav.Link href="/login">Login</Nav.Link>}

                <Nav.Link href="/cart">
                  <FontAwesomeIcon style={{ position: "relative" }}icon={faCartShopping}/>
                    {cartItems.length > 0 && (
                    <div
                    className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                    style={{
                      color: "white",
                      width: "1.3rem",
                      height: "1.3rem",
                      fontSize: "0.7rem",
                      position: "absolute",
                      transform: "translate(70%, -170%)",
                    }}
                  >
                    {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}
                  </div>
                  )}
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      </Navbar>
      
    </Fragment>
  );
};

export default Header;
