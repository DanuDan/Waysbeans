import React, { useContext, useState, useEffect} from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap';
import NavbarUser from '../component/navbarUser';
import Beans from '../assets/Beans.svg'
// import { useParams } from 'react-router-dom';
// import {dataProduct} from '../components/fakedata'
// import { UserContext } from '../context/userContext';
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

function Detail() {
    const title = "Product";
    document.title = "Waysbeans | " + title;

    const params = useParams();
    let navigate = useNavigate();
    const { id } = useParams();
    
    // Product Fetch
    let { data: product, refetch } = useQuery("productsCache", async () => {
            const response = await API.get("/product/" + id);
            return response.data.data;
        });

      // Check Transaction
    const [transaction, setTransaction] = useState([]);
    const getTrans = async () => {
    try {
        let response = await API.get("/transaction-status");
        setTransaction(response.data.data);
        } catch (e) {
        console.log(e.message);
        }
    };

        useEffect(() => {
        getTrans();
        }, []);

    // Handle for Add to cart
    const handleAddToCart = useMutation(async (e) => {
    try {
        e.preventDefault();

    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };
        await API.post("/transaction", config);

        const data = JSON.stringify({
        product_id: parseInt(params.id),
        qty: 1,
        sub_amount: product.price,
    })

        // const body = JSON.stringify(data);

        await API.post("/cart", data, config);
        navigate("/cart");
    } catch (error) {
        console.log(error);
    }
  });


  return (
<div>
            <NavbarUser/>
            <Container  className="mt-5 pt-5">
            {product?.map((item, index) => (
                <Row className="mt-5">
                    <Col xs={12} md={5}>
                        <img 
                        src={item?.image}
                        style={{width: "80%" }}
                        className="img-fluid"
                        alt="transaction"
                        />
                    </Col>
                    <Col xs={12} md={7} style={{backgroundColor:"white"}}>
                        <div>
                            <h1 className='text-start brown fw-bold mb-3'>{item.name}</h1>
                        </div>
                        <div className='mb-3'>
                            <p className='text-start brown' style={{fontSize:"18px", color:"#974A4A"}}>{item?.stock}</p>
                        </div>
                        <div className='mb-5 mt-3'>
                            <Row>
                                <p>{item?.description}</p>

                            </Row>
                        </div>
                        <div className='d-flex' style={{justifyContent:"flex-end"}}>
                            <h2 className='brown fw-bold fs-4 mt-3 mb-5'>Rp{item?.price}</h2>
                        </div>
                    <div className=''>
                        <Button className="btn btn-auth-brown fw-bold mb-4" style={{width:"100%"}} onClick={(e) => handleAddToCart.mutate(e)}>Add to Cart</Button>
                    </div>
                    </Col>
                </Row>
            ))}
            </Container>
        </div>
  )
}

export default Detail
