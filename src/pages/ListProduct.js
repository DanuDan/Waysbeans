import React, {useState} from 'react'
import { Button, Container, Table} from 'react-bootstrap'
import TransModal from '../component/modal/transaction'
import NavbarAdmin from'../component/navbarAdmin';
import { useQuery } from "react-query";
import { API } from "../config/api";

function ListProduct() {
    let { data: products, refetch } = useQuery("productsCache", async () => {
        const response = await API.get("/products");
        return response.data.data;
    });
    let handleDelete = async (id) => {
        let confirm = prompt(" Type 'confirm' for Delete Product", "confirm")
        if (confirm === "confirm") {
            await API.delete(`product/${id}`)
        }
    refetch()
    }

  return (
    <div>
    <NavbarAdmin />
    <Container className='mt-5 pt-5'>
        <div>
            <h1 className='text-start brown fw-semibold mb-5 mt-2'>List Products</h1>
        </div>
        <Table>
            <thead style={{backgroundColor:"#E5E5E5", border:"1px solid grey"}}>
                <tr className=''>
                    <th style={{border:"1px solid grey"}}>No</th>
                    <th style={{border:"1px solid grey"}}>Image</th>
                    <th style={{border:"1px solid grey"}}>Name</th>
                    <th style={{border:"1px solid grey"}}>Stock</th>
                    <th style={{border:"1px solid grey"}}>Price</th>
                    <th style={{border:"1px solid grey"}}>Description</th>
                    <th style={{border:"1px solid grey", width:"200px"}}>Action</th>
                </tr>
            </thead>
            <tbody className='triggered' style={{border:"1px solid grey"}}>
                    {/* <TransModal
                    transShow={transShow} transClose={handleClose} 
                    /> */}
               {products?.map((item,index) => (
                            <tr key={index}>
                        <td>
                            {index + 1}
                        </td>
                        <td style={{border:"1px solid grey"}}>
                           <img src={item?.image}/>
                        </td>
                        <td style={{border:"1px solid grey"}}>
                            {item?.title}
                        </td>
                        <td style={{border:"1px solid grey"}}>
                            {item?.stock}
                        </td>
                        <td style={{border:"1px solid grey"}}>
                            {item?.price}
                        </td>
                        <td style={{border:"1px solid grey"}}>
                            {item?.description}
                        </td>
                        <td className="success" style={{border:"1px solid grey"}}>
                            {/* {item.status === "success" ? "Success" : item.status === "ontheway" ? "On The Way" : item.status === "waiting" ? "Waiting Approve" : item.status === "canceled" ? "Canceled": ""} */}
                            <Button variant="danger" onClick={ () => handleDelete(item.id)} className='pt-0 pb-0 ms-2 me-3'>Delete</Button>  <Button variant="success" className='pt-0 pb-0 mt-1 ms-0 me-0'>Update</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Container>
</div>
  )
}

export default ListProduct
