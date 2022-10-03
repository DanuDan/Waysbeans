import React, { useContext, useState, useEffect } from "react";
import { Container, Dropdown, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../assets/Logo.svg";
import cart from "../assets/Cart.png";
import { Link, useNavigate } from "react-router-dom";
import {CgProfile} from 'react-icons/cg';
import {MdLogout} from 'react-icons/md'
import { UserContext } from "../context/userContext";
import profilePic from '../assets/JasonMomoa.jpg'
import { API } from "../config/api";

export default function NavbarUser(){

const [dataCart,setDataCart] = useState([]);
const [profiles,setProfile] = useState([]);

useEffect(() => {
  const dataCart = async () => {
    try {
        const response = await API.get('cart-id')
        setDataCart(response.data.data)
    } catch (error) {
        console.log(error);
    }
};
dataCart();
}, [setDataCart]);

let TotalQTY = 0

dataCart.forEach((item) => {
TotalQTY += item?.qty
})

let notif = TotalQTY == 0 ? "" : <span className="ctb text-danger fw-bold px-2" style={{backgroundColor:"red", padding:"2px"}}> {TotalQTY} </span>;

useEffect(() => {
  const profiles = async () => {
      try {
          const response = await API.get('/profiles')
          setProfile(response.data.data[0])
          } catch (error) {
               console.log(error);
          }
      };
      profiles();
      }, [setProfile]);

      console.log (profiles)
  const picProfileToggle = <Image src= {profiles.image === "https://waysbeans-porto.herokuapp.com/" ? profilePic : profiles.image.substr(38)}
  width="50px" height="50px" className="rounded-circle"/>

  const [state, dispatch] = useContext(UserContext);

    let navigate = useNavigate();
  
    const logout = () => {
      dispatch({
        type: "LOGOUT",
      });
      navigate("/");
    };
    return (
        <div>
            <Container>
        <Navbar fixed="top d-flex bg-white justify-content-between shadow-lg bg-white">
          <Navbar.Brand className="ps-5">
            <Link to="/">
              <img src={logo} style={{ maxWidth: "100px" }} alt="logobrand" />
            </Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="mt-2 ">
              <Link to="/cart" className="text-decoration-none">
                <img src={cart} alt="" style={{ maxWidth: "40px", position:'absolute', right:'145px'}} />
                {notif}

              </Link>
            </Nav.Link>
            <Nav.Link className="align-item-center justify-content-center pe-5 fw-bolder brown bold">
              <NavDropdown title={picProfileToggle}>
                <Dropdown.Item className="brown">
                  <Link
                    to="/profile"
                    className="brown text-decoration-none fw-semibold" 
                  >
                    <CgProfile className="me-2"/>
                    <span> Profile</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="brown fw-semibold">
                  <MdLogout className="me-2"color="red"/>
                  <span  onClick={logout}> Logout</span>
                </Dropdown.Item>
              </NavDropdown>
            </Nav.Link>
          </Nav>
        </Navbar>
        </Container>
     </div>
    );
}