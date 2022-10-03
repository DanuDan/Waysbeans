import React, {useState, useEffect} from 'react'
import {Modal, Col, Row} from 'react-bootstrap'
import logo from "../../assets/Logo.svg";
import barcode from '../../assets/Barcode.svg'
import { API } from '../../config/api';
import beans from '../../assets/Beans.svg'


export default function TransModal(props) {
    
    console.log(props);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [transaction, setTransaction] = useState([]);
    
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

    return (
    // <Modal show={props.transShow} onHide={props.transClose} {...props}
            <Row style={{background:"none"}}>
            <Col>
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
                                     <li style={{listStyle:"none", fontSize:"18px"}}><p className='brown fw-bold'>{itm.product.name}</p></li>
                                     <li style={{listStyle:"none", fontSize:"14px"}}><p className='brown fw-normal mb-5'><span className='fw-bold'>Saturday,</span> 5 march 2020</p></li>
                                     
                                     <li style={{listStyle:"none", fontSize:"14px"}}> <p className="fw-normal mb-0" style={{color:"#613D2B"}}> Qty : <span>{itm?.qty}</span></p></li>
                                     <li style={{listStyle:"none", fontSize:"14px"}}> <p className="fw-normal mb-0" style={{color:"#613D2B"}}>Price : Rp. <span>{itm.product.price},-</span></p></li>
                                 </ul>
                                 </Row>
                     </div>
                     
                     </Col>
                     ))}
                     
                     </Col>
                     
                     {/* <Col className='align-items-center ms-2'>
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
                         <div className='d-flex justify-content-center ' style={{backgroundColor:'rgb(255,175,25, 0.5)', borderRadius:"8px"}}>
                             <p className='p-2 mb-0 mt-0 fw-semibold justify-content-center' style={{color:"#FF9900"}}>{item?.status}</p>
                         </div>
                         </div>

                         <div>
                         <p className='fw-bold mb-0 ms-3' style={{color:"#974A4A"}}>Sub total : Rp. <span style={{color:"#974A4A"}}>{item?.amount}</span></p>
                         </div>
                         </Col> */}
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
                                  item?.status === 'Failed' ? 'danger' : 'info'}`}>{item?.status}</p>
                         </div>
                         </div>

                         <div className='d-flex justify-content-center'>
                         <p className='fw-bold mb-0' style={{color:"#974A4A"}}>Sub total : Rp. <span style={{color:"#974A4A"}}>{item?.amount}</span></p>
                         </div>
                         </Col>
                     
                 </Row>
                 
                 
                 ))}
             </Col>
            </Row>
  )
}