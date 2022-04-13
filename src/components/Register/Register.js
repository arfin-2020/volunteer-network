import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../../App.css';
import logo from '../../assets/images/logo.png';
import "./Register.css";

const Register = () => {
  const location = useLocation();
//   console.log(location.state.title);
  const title  = location.state.title;
  const imgURL  = location.state.img;
//   console.log('Image URL -------',imgURL)
    const navigate =  useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data,e) => {
    //   console.log(data.name)
        fetch('http://localhost:5000/registers',{
            method : "POST",
            headers: {
                'Content-Type' : 'Application/json'
            },
            body : JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.insertedId){
                toast.success("Event Register successfull Successfully,", {
                    theme: "colored",
                  });
            }
            navigate("/register/events", { state: `${data.name}` });
            e.target.reset();
            
            // alert('data send successfully')
            // console.log(result)

        })
  }

  return (
    <Container className="registerForm">
    <Row>
      <Col md={4}></Col>
      <Col md={4} className="text-center ml-20">
        <img src={logo} width="150" height="50" alt="Logo" />
      </Col>
      <Col md={4}></Col>
    </Row>
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <Card className="registerForm__card">
          <Card.Body>
            <Card.Title>
              <h1>Register as a Volunteer!</h1>
            </Card.Title>
            <Form onSubmit={handleSubmit(onSubmit)} className="text-center">
              <Form.Group className="mb-2">
                <Form.Control
                  
                  type="text"
                //   defaultValue={userData.name}
                placeholder="name"
                  className="form__focus"
                  {...register('name',{
                    required: "Name is required",
                    pattern: {
                      value: /[A-Z][a-z]/,
                      message: "First text should be capitalized",
                    },
                    minLength: {
                      value: 5,
                      message: " should be 5 characters",
                    },
                  })}
                />
                <span style={{ color: "red" }}>
                  {errors.name && errors.name.message}
                </span>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  name="email"
                  type="text"
                //   defaultValue={userData.email}
                  placeholder="Email"
                //   readOnly
                  className="form__focus"
                  {...register('email',{
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: 'Email should be "@" & "." ',
                    },
                  })}
                />
                <span style={{ color: "red" }}>
                  {errors.email && errors.email.message}
                </span>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  name="date"
                  type="text"
                  placeholder="Date"
                  className=" form__focus"
                  {...register('date',{
                    required: "Date is required",
                    pattern: {
                      value: /^[0-3]?[0-9][/][0-3]?[0-9][/](?:[0-9]{4})$/,
                      message: "Date should be like 00/00/000",
                    },
                  })}
                />
                <span style={{ color: "red" }}>
                  {errors.date && errors.date.message}
                </span>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  name="description"
                  type="text"
                  placeholder="Description"
                  className=" form__focus"
                  {...register('description',{
                    required: "Description is required",
                    pattern: /([a-zA-Z])\w+/,
                    minLength: {
                      value: 20,
                      message: " should be 20 characters",
                    },
                  })}
                />
                <span style={{ color: "red" }}>
                  {errors.description && errors.description.message}
                </span>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  name="title"
                  type="text"
                  readOnly
                  defaultValue={title}
                  className=" form__focusDefault"
                  {...register('title',{
                    required: "Description is required",
                    pattern: /([a-zA-Z])\w+/,
                  })}
                />
                <span style={{ color: "red" }}>
                  {errors.title && errors.title.message}
                </span>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  name="title"
                  type="text"
                  readOnly
                  defaultValue={imgURL}
                  className=" form__focusDefault"
                  {...register('imgUrl',{
                    required: "Description is required",
                    pattern: /([a-zA-Z])\w+/,
                  })}
                />
                <span style={{ color: "red" }}>
                  {errors.title && errors.title.message}
                </span>
              </Form.Group>
              <Button
                  className="registerForm__btn"
                  variant="primary"
                  type="submit"
                >
                  Registration
                </Button>
              {/* {!registerData.isSignIn ? (
                <Button
                  className="registerForm__btn"
                  variant="primary"
                  type="submit"
                >
                  Registration
                </Button>
              ) : (
                <Link to="/register-volunteer">
                  <Button
                    className="registerForm__btn"
                    variant="outline-success"
                  >
                    Welcome Volunteer
                  </Button>
                </Link>
              )} */}
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  </Container>
  );
};

export default Register;
