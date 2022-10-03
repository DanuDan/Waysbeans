import React, { useContext, useState, useEffect, } from 'react'
import { Container, Row, Col, Modal, Button} from 'react-bootstrap'
import profPic from '../assets/JasonMomoa.jpg'
import logo from "../assets/Logo.svg";
import barcode from '../assets/Barcode.svg'
import beans from '../assets/Beans.svg'
import { UserContext } from '../context/userContext';
import {Link} from 'react-router-dom'
import NavbarUser from '../component/navbarUser';
import TransModal from '../component/modal/transaction';
import { API } from '../config/api';

function Profile() {

    const title = "Profile";
    document.title = "Waysbeans | " + title;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state, dispatch] = useContext(UserContext);
    const [transaction, setTransaction] = useState([]);
    const [profile, setProfile] = useState([]);
    
useEffect(() => {
const transaction = async () => {
          try {
              const response = await API.get('/transactions')
              setTransaction(response.data.data)
          } catch (error) {
              console.log(error);
          }
      };
      transaction();
      }, [setTransaction]);



useEffect(() => {
    const profile = async () => {
        try {
            const response = await API.get('/profiles')
            setProfile(response.data.data)
            } catch (error) {
                 console.log(error);
            }
        };
        profile();
        }, [setProfile]);

  return (
    <div>
    <NavbarUser/>
    <Modal show={show} onHide={handleClose} style={{background:"none"}}>
    <div>
                     <h4 className='text-start fw-bold fs-4 mb-3 pointer' style={{color:"#613D2B", cursor:"pointer"}} 
                     onClick={handleClose}>My Transaction</h4>
                     
                 </div>
    <TransModal/>
    </Modal>
     <Container className='mt-5 pt-5'>
         <Row>
             <Col xs={12} md={6} className="ps-2 p-2">

             {profile?.map((item, index) => (
                
                 <Row key={index}>
                     <Col xs={12} md={6}>
                     <h4 className='text-start text-danger fw-bold fs-4'>My Profile</h4>
                     <img
                     src= {item?.image.substr(38) === "https://waysbeans-porto.herokuapp.com/" ? profPic : item?.image.substr(38)} 
                     style={{width:"100%", height:"100%", borderRadius:"5px"}}
                     className=''
                     alt=''
                     />
                     
                     <Link  to={`/edit/${item.id}`}
                     className="text-decoration-none fw-semibold" style={{color:'white'}}>
                     <Button type="button" style={{ width: "100%"}} className="btn btn-auth-brown mt-4">Edit Profile</Button> </Link>
                     </Col>

                     <Col xs={12} md={6} className="pt-5">
                         <div>
                             <h4 className='text-start fw-semibold fs-4' style={{color:"#613D2B"}}>Full Name</h4>
                             <h4 className='text-start fw-normal fs-4'>{item.user.name.substr(0, 17)}</h4>
                         </div>
                         <div>
                             <h4 className='text-start fw-semibold fs-4' style={{color:"#613D2B"}}>Email</h4>
                             <h4 className='text-start fw-normal fs-4'>{item.user.email.substr(0, 17)}</h4>
                         </div>
                         <div>
                         <h4 className='text-start fw-semibold fs-4' style={{color:"#613D2B"}}>Address</h4>
                             <h4 className='text-start fw-normal fs-4'>{item?.address.substr(0, 17)}</h4>
                         </div>
                         <div>
                         <h4 className='text-start fw-semibold fs-4' style={{color:"#613D2B"}}>Postcode</h4>
                             <h4 className='text-start fw-normal fs-4'>{item?.postcode.substr(0, 17)}</h4>
                         </div>
                         <div>
                         <h4 className='text-start fw-semibold fs-4' style={{color:"#613D2B"}}>Phone Number</h4>
                             <h4 className='text-start fw-normal fs-4'>{item?.phone.substr(0, 17)}</h4>
                         </div>
                     </Col>
                 </Row>
             ))}
             
             </Col>
             
             <Col>
                 <div>
                     <h4 className='text-start fw-bold fs-4 mb-3' style={{color:"#613D2B"}}>My Transaction</h4>
                     
                 </div>
                 {transaction?.map((item, index) => (
                
                    
                 <Row className="p-3 mb-5" style={{backgroundColor:"#F6DADA", borderRadius:"5px"}}>
                     <Col key={index}>
                    {item.cart.map((itm,idx) => (
                     <Col className="mb-4">
                         
                             <div className="d-flex">
                             <Row className="pt-2" style={{padding:'auto'}}>
                                 <img
                                 src={itm.product.image}
                                 style={{maxWidth:"180px", width:'100%', height:'80%', borderRadius:"8px"}}
                                 className=''
                                 alt=''
                                 />
                                  </Row>
                                  <Row className="ms-2">
                                 <ul className="text-start ps-2 mb-0">
                                 
                                     <li style={{listStyle:"none", fontSize:"18px"}}><p className='brown fw-bold' onClick={handleShow} style={{cursor:"pointer"}}>{itm.product.name}</p></li>
                                     <li style={{listStyle:"none", fontSize:"14px"}}><p className='brown fw-normal mb-5'><span className='fw-bold'>Saturday,</span> 5 march 2020</p></li>
                                     
                                     <li style={{listStyle:"none", fontSize:"14px"}}> <p className="fw-normal mb-0" style={{color:"#613D2B"}}> Qty : <span>{itm?.qty}</span></p></li>
                                     <li style={{listStyle:"none", fontSize:"14px"}}> <p className="fw-normal mb-0" style={{color:"#613D2B"}}>Price : Rp. <span>{itm.product.price},-</span></p></li>
                                 </ul>
                                 </Row>
                     </div>
                     
                     </Col>
                     ))}
                     
                     </Col>
                     
                     <Col className='align-items-center ms-2'>
                         <div className='d-flex justify-content-center mb-3'>
                             <img
                             src={logo}
                             style={{width:"60%"}}
                             className='align-items-center'
                             alt=''
                             />
                         </div>
                         <div className='d-flex justify-content-center'>
                             <img
                             src={barcode}
                             style={{width:"40%"}}
                             className='mb-3'
                             alt=''
                             />
                         </div>
                         <div className='d-flex justify-content-center'>
                         <div style={{borderRadius:"8px"}} className={`d-flex justify-content-center bg-${item?.status === 'Pending' ? 'warning' :
                             item?.status === 'Success' ? 'success' :
                                item?.status === 'Cancel' ? 'danger' :
                                    item?.status === 'Failed' ? 'danger' : 'info'} bg-opacity-10`}>

                          <p className={`p-2 mb-0 mt-0 fw-semibold justify-content-center' 
                             text-${item?.status === 'Pending' ? 'warning' :
                                item?.status === 'Success' ? 'success' :
                                 item?.status === 'Cancel' ? 'danger' :
                                  item?.status === 'Failed' ? 'danger' : 'infp'}`}>{item?.status}</p>
                         </div>
                         </div>

                         <div className='d-flex justify-content-center'>
                         <p className='fw-bold mb-0' style={{color:"#974A4A"}}>Sub total : Rp. <span style={{color:"#974A4A"}}>{item?.amount}</span></p>
                         </div>
                         </Col>
                     
                 </Row>
                 
                //  </Modal>
                 ))}
             </Col>
         </Row>
     </Container>
 </div>
  )
}

export default Profile
