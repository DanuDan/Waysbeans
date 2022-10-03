import React, {useContext, useState, useEffect} from 'react'
import { Button, Col, Container, Row, Image } from 'react-bootstrap'
// import DeleteModal from '../components/modal/delete';
import {BsTrash} from 'react-icons/bs';
import Beans from '../assets/Beans.svg';
import {useQuery} from 'react-query';
import {API} from '../config/api';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
// import PaymentModal from '../components/modal/payment';
// import { UserContext } from '../context/userContext';
import NavbarUser from '../component/navbarUser';




function Cart() {

    const title = "Cart";
    document.title = "Waysbeans | " + title;

    const [dataCart,setDataCart] = useState([]);
    const navigate = useNavigate();

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

    let Total = 0
    dataCart.forEach((item) => {
        Total += item.product?.price * item?.qty
    })

    let handleDelete = async (id) => {
        await API.delete(`/cart/` + id);
        const response = await API.get('cart-id')
        setDataCart(response.data.data)
    }

    let handleIncrement = async (id, qty, price) => {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            },
        }
        const newQty = qty + 1
        const newSub = newQty * price
        const body = JSON.stringify({
            qty : newQty,
            sub_amount : newSub
        })
        await API.patch(`/cart/${id}`, body, config)
        const response = await API.get('cart-id')
        setDataCart(response.data.data)
    }

    let handleDecrement = async (id, qty, price) => {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            },
        }
        const newQty = qty - 1
        const newSub = newQty * price
        const body = JSON.stringify({
            qty : newQty,
            sub_amount : newSub
        })
        await API.patch(`/cart/${id}`, body, config)
        const response = await API.get('cart-id')
        setDataCart(response.data.data)
    }

    const data = {
        status: "",
        amount: Total
    }

    console.log(Total);

    const handleSubmit = useMutation(async (e) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const body = JSON.stringify(data);
        const response = await API.patch("/transaction", body, config);
        const token = response.data.data.token;

        window.snap.pay(token, {
            onSuccess: function (result) {
                console.log(result);
                navigate("/profile");
            },
            onPending: function (result) {
                console.log(result);
            },
            onError: function () {
                alert("you closed the popup without finishing the payment");
            },
        });
    })

    useEffect(() => {
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidTransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute("data-client-key", myMidTransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

  return (
    <div>
    <NavbarUser />
    <Container className='mt-5'>
        <Row className="">
            <Col xs={12} md={7} className="mt-5 py-5 px-4" style={{}}>
                
                <div style={{backgroundColor:"white", borderTop:"2px solid black", borderBottom:"2px solid black"}}>
                
                {dataCart?.map((item, index) => (
                    <Row className="p-3">
                        <Col xs={12} md={2} style={{}}>
                            <Image src = {item.product.image.substr(38)} alt="" style={{width:"72px", borderRadius:""}} />
                        </Col>
                        <Col xs={12} md={6} style={{}}>
                            <ul className="description justify-content-start align-items-center pt-2 ps-0 mb-0">
                                <li>
                                    <p className='brown fw-bold'>{item.product.name}</p>
                                </li>
                            </ul>
                                <div className='d-flex' style={{alignItems: "center"}}>
                                   <p className='brown ms-2 me-2 mt-2 fw-bold fs-4 c-pointer'
                                   onClick={() => handleDecrement(
                                                    item.id,
                                                    item.qty,
                                                    item.product.price,
                                                )}>-</p>
                                   <button className="ms-2 me-2 ps-3 pe-3 btn-light-brown d-flex align-items-center fs-6" style={{height:"20px"}}>{item?.qty}</button>
                                   <p className='brown ms-2 me-2 mt-2 fw-bold fs-4 c-pointer' onClick={() => handleIncrement(item.id, item.qty, item.product.price)} >+</p>
                                </div>
                        </Col>
                        <Col xs={12} md={4} style={{}}>
                        <ul className="description text-end align-items-center pt-2 pr-3 ps-0 mb-0">
                                <li>
                                    <p className='brown fw-semibold'>Rp.{item.product.price},-</p>
                                </li>
                                <li >
                                    <i className='trash-btn' onClick={() => handleDelete(item.id)}><BsTrash/></i>
                                </li>
                                {/* <DeleteModal listDel={listDel} Close={handleCloseDel} /> */}
                            </ul>
                        </Col>
                    </Row>
                 ))} 
                </div>
            </Col>
            <Col xs={12} md={5} className="mt-5 p-5">
                <div className="p-2" style={{borderTop:"2px solid black", borderBottom:"2px solid black", width:"80%"}}>
                   <div className='d-flex justify-content-between'>
                        <p className='brown'>Subtotal</p>
                        <p className='brown'>Rp.{Total},-</p>
                   </div>
                   <div className='d-flex justify-content-between'>
                        <p className='brown'>Qty</p>
                        <p className='brown'>{TotalQTY}</p>
                   </div>
                </div>
                 <div className='d-flex justify-content-between' style={{width:"80%"}}>
                    <p className='brown fw-bold'>Total</p>
                    <p className='brown fw-bold'>Rp. {Total},-</p>
               </div>
               <div className="mt-5" style={{width:"80%"}}>
                <Button className="btn btn-auth-brown fw-bold px-5" style={{width:"80%"}} onClick={(e) => handleSubmit.mutate(e)}>
                    Pay
                </Button>
                {/* <PaymentModal payShow={payShow} Close={handleClose} /> */}
               </div>
            </Col>
        </Row>
    </Container>
      
    </div>
  )
}

export default Cart
