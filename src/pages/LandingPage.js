import React, {useState, useEffect, useContext} from 'react';
import NavbarLogin from '../component/navbar';
import NavbarUser from '../component/navbarUser';
import { UserContext } from '../context/userContext';
import '../assets/styles.css';
import NavbarAdmin from '../component/navbarAdmin';
import { Container, Card, Col, Row, Image, Alert, Modal} from 'react-bootstrap';
import imageContainer from "../assets/Rectangle 3.svg";
import logo from "../assets/Logo.svg";
import background from "../assets/Background.png";
import waves from "../assets/Waves.svg";
import { API } from "../config/api";
import { useQuery } from 'react-query';
import { useNavigate, Link } from "react-router-dom";
import LoginAuth from "../component/modal/login"


function LandingPage() {
  const [state, dispatch] = useContext(UserContext);

  const title = "Home";
    document.title = "Waysbeans | " + title;

  const navigate = useNavigate();


  let { data: products, refetch } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
});

  // const movetoDetail = (id) => {
  //   navigate("/product/" + id);
  // };
 
  console.log(state);
  return (
    <div style={{width:"auto"}} className="justify-content-center">
         {state.isLogin ?  <NavbarUser/>: <NavbarLogin/> }

      <Container className='d-flex mt-5 mb-5 justify-content-center' >
    <div style={{position:"relative"}}>
      <Card className='mt-5 d-flex justify-content-center'>
        
      <Card.Img  src={background} style={{height: "465px"}} alt="Card image" />
      <Card.ImgOverlay className= "d-flex justify-content-center">
    <Row className='d-flex justify-content-center'>
      {/* <Row className="d-flex justify-content-center ps-0 pe-0"> */}
        <Col sm={7} style={{ height: "230px" }} className='pe-0'><Card.Title><Card.Img src={logo} style={{ width: "425px" }} className="mt-5 ms-3 pe-0" /></Card.Title></Col>
        <Col sm={4} className='d-flex ps-0 pe-0'> <Image src= {imageContainer} alt="Card image" className='ms-3' style={{ maxWidth: "auto", borderRadius:"2px",}}/></Col>
        {/* </Row> */}
      <Row className='d-flex justify-content-center ps-4' >
        <Col sm ={6} ><Card.Text className="fw-semibold fs-5 d-flex justify-content-flex-start ms-1"> BEST QUALITY COFFEE BEANS</Card.Text>
        <Card.Text className="d-flex justify-content-flex-start fs-5 mb-0 ms-1"> Quality freshly roasted coffee made just for you.</Card.Text>
        <p className="d-flex justify-content-flex-start fs-5 ms-1"> Pour, brew and enjoy.</p></Col>
        <Card.Img src={waves} style={{ width: "350px"}}alt="Card image" className=''/>
        </Row>
    </Row>
    
        </Card.ImgOverlay>
    </Card>
    </div>
</Container>



<div className='d-flex flex-wrap justify-content-center'>
{products?.map((item, index) => (
    // <Col className='d-grid' key={index}>

    
    <Card style={{ maxWidth: '16rem', minWidth:'13rem'}} className="m-2 ms-5 pe-0 ps-0" key={index}>
       <Link to={state.isLogin === true ? `/detail/${item.id}` : <Modal><LoginAuth/></Modal>}>
          <Card.Img variant="top" src={item.image.substr(38)}/>
       </Link>
      <Card.Body className="bgCard">
        <Card.Title className='brown'>{item.name}</Card.Title>
        <Card.Text className="mb-1">
        {item.price}
        </Card.Text>
        <Card.Text>
        {item.stock}
        </Card.Text>
      </Card.Body>
    </Card>


    ))}
    </div>
    {/* </Container> */}
    </div>



      

  ) 
}

export default LandingPage
