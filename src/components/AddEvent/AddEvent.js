import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../NavBar/NavBar";
import classes from './AddEvent.module.css';

const AddEvent = () => {
  const titleRef = useRef("");
  const urlRef = useRef("");
  const descriptionRef = useRef("");
  const navigate = useNavigate();

  const handleFormSubmit = e => {
    e.preventDefault();
    const title = titleRef.current.value;
    const img = urlRef.current.value;
    const description = descriptionRef.current.value;
    // console.log(title,imgUrl,description)
    const eventDetails = { title, img, description };
    // console.log(eventDetails)

    fetch("https://powerful-bastion-35071.herokuapp.com/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventDetails),
    })
      .then(res => res.json())
      .then(event => {
        if (event.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Event added successfull.",
            showConfirmButton: false,
            timer: 2000,
          });
          e.target.reset();
          navigate("/");
        }
      });
  };
  return (
    <>
      <NavBar />
      
      <Link to="/volunteerList">
        <p className={`${classes.backIcon}`}>
          {" "}
          See all Volunteer list <ArrowRightAltIcon />
        </p>
      </Link>
      <div >
      <form onSubmit={handleFormSubmit} className={`${classes.from1} sm:mt-20 lg:mt-0`}>
        <h1 className="text-center text-1xl md:text-2xl lg:text-2xl poppins font-semibold text-black " >
          Add Event
        </h1>
        <div className={`${classes.all_input}`}>
          <div>
            <input
                required
              ref={titleRef}
              className={`${classes.formControl}`}
              type="text"
              placeholder="Enter title"
            />
          </div>
          <div>
            <input
            required
            ref={urlRef}
            className={`${classes.formControl}`}
              type="text"
              placeholder="Enter Imag URL Only"
            />
          </div>
        </div>
        <textarea
        required
        ref={descriptionRef}
        className={`${classes.textareaControl}`}
          rows="4"
          cols="50"
          placeholder="Description"
        ></textarea>
        <button className=" bg-blue-700 w-25 h-10 py-2 px-4 mt-5 rounded-full text-sm text-white font-semibold">
          Submit{" "}
        </button>
      </form>
      </div>
    </>
  );
};

export default AddEvent;
