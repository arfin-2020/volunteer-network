import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../NavBar/NavBar";

const Events = () => {
  const location = useLocation();
  // console.log(location.state);
  // console.log(array)
  const [events, setEvents] = useState([]);
  //   console.log(events)
  const eventName = location.state;
  let eventNametoArray = new Array(eventName);

  useEffect(() => {
    fetch("https://powerful-bastion-35071.herokuapp.com/allevents/byName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventNametoArray),
    })
      .then(res => res.json())
      .then(result => {
        setEvents(result);
      });
  }, []);


  const deleteHandler = (id) =>{
    console.log(id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete it!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://powerful-bastion-35071.herokuapp.com/events/${id}`,{
          method: "DELETE",
          
      })
      .then(res=>res.json())
      .then(result=>{
        if(result.deletedCount===1){
          const remainingEvents = events.filter(event=>event._id !== id);
          setEvents(remainingEvents)
        }
      })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
     
  }

  return (
    <>
    <NavBar/>
        <div className="mt-20 sm: py-5">
    <h1 className="block mt-1 text-lg leading-tight text-indigo-500 font-bold mb-10">Your Total registered Events : {events.length}</h1>
      {events.map(event => ( 
        <div key={event._id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-5  ">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={event.imgUrl}
                alt="Man looking at item at a store"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {event.title}
              </div>
              <p className="mt-2 text-slate-500">
                {event.description}
              </p>
              <button className="bg-blue-700  py-2 px-4  rounded-full text-sm text-white font-semibold" onClick={()=>deleteHandler(event._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Events;
