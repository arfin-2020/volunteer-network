import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../NavBar/NavBar";
import "./AddEvent.css";
const AddEvent = () => {
    const titleRef = useRef("");
    const urlRef = useRef("");
    const descriptionRef = useRef("");
    const navigate =   useNavigate()

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        const title = titleRef.current.value;
        const img = urlRef.current.value;
        const description = descriptionRef.current.value;
        // console.log(title,imgUrl,description)
        const eventDetails = {title,img,description}
        // console.log(eventDetails)

        fetch('http://localhost:5000/addEvent',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
             body : JSON.stringify(eventDetails)
        })
            .then(res=>res.json())
            .then(event=>{
                if(event.insertedId){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your Event added successfull.',
                        showConfirmButton: false,
                        timer: 2000
                      })
                      e.target.reset();
                      navigate('/')
                }
            })
      
    }
  return (
    <>
      <NavBar />
      <div className="background">
        <Link to="/volunteerList">
          <p className="backIcon">
            {" "}
            See all Volunteer list <ArrowRightAltIcon />
          </p>
        </Link>
        <form className="form-background row g-3" onSubmit={handleFormSubmit}>
          <h1 className="text-lg  text-indigo-500 font-bold mb-10">
            Add Event here
          </h1>
          <div className="col-auto">
            <input  required
              className="form-Control"
                ref={titleRef}
              type="text"
              placeholder="Enter Title"
            />{" "}
          </div>
          <div className="col-auto">
            <input required
              className="form-Control"
              ref={urlRef}
              type="text"
              placeholder="Enter Image url"
            />
          </div>
          <div className="col-auto">
            <textarea required
              className="textarea-Control"
              ref={descriptionRef}
              rows="4"
              cols="50"
            
              type="text"
              placeholder="Description"
            />
          </div>{" "}
          <button className="bg-blue-700 w-25 h-10 py-2 px-4 mt-20 rounded-full text-sm text-white font-semibold">
            Submit{" "}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEvent;
