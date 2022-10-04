import React, {useState} from 'react'
import {Col, Container, Form, Row, Button, FloatingLabel} from 'react-bootstrap';
import Clip from '../assets/Thumbnail.svg'
import { useMutation, useQuery, } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {API} from '.././config/api'
import NavbarUser from '../component/navbarUser'
import Beans from '../assets/Beans.svg'

function EditProfile() {
  const title = "Edit Profile";
    document.title = "Waysbeans | " + title;

    // UPDATE
    const { id } = useParams();
    let { data: profiles } = useQuery("profileCache", async () => {
        const response = await API.get("/profile/" + id);
        return response.data.data;
        
      });
      
    const [previewName, setPreviewName] = useState(""); //name
    const [preview, setPreview] = useState(null); //image

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        postcode: "",
        image:"",
        phone:"",
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
            formData.set("address", form.address);
            formData.set("postcode", form.postcode);
            formData.set("phone", form.phone);

            // Insert category data
            await API.patch("/profile/" + profiles.id, formData, config)
              console.log(formData);
            navigate("/");
            } catch (error) {
            console.log(error);
            }
        });
  return (
    <div>
        <NavbarUser/>
      <Container className='mt-5 pt-5'>
        <Row>
        <Col xs={12} md={6}>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className='add-title brown mb-5'>
              <h1 className='fw-bold'>Edit Profile</h1>
            </div>
            <Form.Group>
            <FloatingLabel controlId="floatingTextarea2" 
                           label="Name" 
                           className='mb-4' 
                           style={{ color: 'gray'}}>
              <Form.Control type='text'
                            name='name' 
                            onChange={handleChange}
                            placeholder='Name' 
                            className='formInput mb-4'/>
                            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" 
                           label="Email" 
                           className='mb-4' 
                           style={{ color: 'gray'}}>
                <Form.Control type='text'
                            name='email' 
                            onChange={handleChange}
                            placeholder='Email' 
                            className='formInput mb-4'/>
                            </FloatingLabel>

                <FloatingLabel controlId="floatingTextarea2" 
                           label="Address" 
                           className='mb-4' 
                           style={{ color: 'gray'}}>      
                        <Form.Control type='text'
                              name="address"
                              onChange={handleChange}
                              placeholder='Address'
                              className='formInput mb-4'/>
                            </FloatingLabel>  

                <FloatingLabel controlId="floatingTextarea2" 
                           label="Postcode" 
                           className='mb-4' 
                           style={{ color: 'gray'}}>
                        <Form.Control type='text' 
                                name="postcode" 
                                onChange={handleChange}
                                placeholder='Postcode'
                                className='formInput mb-4'/>
                                </FloatingLabel>

                <FloatingLabel controlId="floatingTextarea2" 
                           label="Phone" 
                           className='mb-4' 
                           style={{ color: 'gray'}}>
                        <Form.Control type='text' 
                                name="phone" 
                                onChange={handleChange}
                                placeholder='Phone Number'
                                className='formInput mb-4'/>
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
                    placeholder="Your Photo"
                    onChange={handleChange}
                    hidden
                  />
                </div>
              </Form.Group>
              <div className='d-flex justify-content-center'>
              <Button type="submit" className="btn btn-auth-brown fw-semibold" style={{width:"60%"}}>
                Save Profile
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
            style={{maxWidth:"400px", height:"80%",borderRadius:"5px"}}
            alt=''
            />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EditProfile
