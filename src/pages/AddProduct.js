import React, {useState} from 'react'
import {Col, Container, Form, Row, Button, FloatingLabel} from 'react-bootstrap';
import Clip from '../assets/Thumbnail.svg'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {API} from '.././config/api'
import NavbarAdmin from '../component/navbarAdmin'
import Beans from '../assets/Beans.svg'

function AddProduct() {
  const title = "Add Product";
    document.title = "Waysbeans | " + title;

    const [previewName, setPreviewName] = useState(""); //name
    const [preview, setPreview] = useState(null); //image

    const [form, setForm] = useState({
        name: "",
        desc: "",
        price: "",
        image:"",
        stock:""
      }); //Store data product

      //handle chahnge data on from
      console.log(form);
    const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
        setPreviewName(e.target.files[0].name);
        }
    };

    let navigate = useNavigate();

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration
            const config = {
                headers: {
                "Content-type": "multipart/form-data",
                },
            };

            const formData = new FormData();
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("name", form.name);
            formData.set("price", form.price);
            formData.set("description", form.desc);
            formData.set("stock", form.stock);

            // Insert category data
            await API.post("/product", formData, config);
              console.log(formData);
            // navigate("/transaction");
            } catch (error) {
            console.log(error);
            }
        });
  return (
    <div>
        <NavbarAdmin />
      <Container className='mt-5 pt-5'>
        <Row>
        <Col xs={12} md={6}>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className='add-title brown mb-5'>
              <h1 className='fw-bold'>Product</h1>
            </div>
            <Form.Group>
              <Form.Control type='text'
                            name='name' 
                            onChange={handleChange}
                            placeholder='Title Product' 
                            className='formInput mb-4'/>
                <Form.Control type='text'
                              name="stock"
                              onChange={handleChange}
                              placeholder='Stock'
                              className='formInput mb-4'/>
                  <Form.Control type='text' 
                                name="price" 
                                onChange={handleChange}
                                placeholder='Price'
                                className='formInput mb-4'/>
            <FloatingLabel controlId="floatingTextarea2" 
                           label="Description Product" 
                           className='mb-4' 
                           style={{ color: 'gray'}}>
                    <Form.Control as="textarea" 
                                  name="desc" 
                                  onChange={handleChange}
                                  placeholder="Leave a comment here"
                                  className='formInput' style={{ height: '100px'}}/>
            </FloatingLabel>
                  <div className='input-group mb-4' style={{borderRadius:"5px"}}>
                         <label
                    className="mb-5 pt-2 pb-2 ps-1 pe-1 d-flex justify-content-between align-item-center formInput"
                    htmlFor="image"
                    style={{
                      width: "50%",
                      borderRadius: "5px",
                      border: "1px solid",
                      color: "gray",
                    }}
                  >
                    {previewName === "" ? "Photo Product" : previewName}
                    {/* Photo Product */}
                    <img src={Clip} alt="" />
                  </label>
                  <input
                    className="mb-5 pt-2 pb-2 ps-1"
                    name="image"
                    type="file"
                    id="image"
                    placeholder="Photo Product"
                    onChange={handleChange}
                    hidden
                  />
                </div>
              </Form.Group>
              <div className='d-flex justify-content-center'>
              <Button type="submit" className="btn btn-auth-brown fw-semibold" style={{width:"60%"}}>
                Add Product
              </Button>
              </div>
              {/* <ProductAdd addProduct={addProduct}/> */}
            </Form>
          </Col>
          <Col xs={12} md={6} className="mt-5 d-flex justify-content-center">
            {preview &&(
            <img
            src={preview}
            className=''
            style={{height:"80%",borderRadius:"5px"}}
            alt=''
            />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AddProduct
