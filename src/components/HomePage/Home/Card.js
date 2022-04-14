import React, { useEffect, useState } from "react";
import Cards from '../../Cards';
import Skeleton from '../../Skeleton';
import UseFetch from "../../UseFetch";
import classes from './Home.module.css';
const Card = () => {
  // const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [displayEvents, setDisplayEvents] = useState([]);
  const [events,setEvents, displayEvents, setDisplayEvents] = UseFetch([]);

  // console.log(setEvents)
  // useEffect(() => {
  //   fetch("http://localhost:5000/events")
  //     .then(res => res.json())
  //     .then(data => {
  //       setEvents(data);
  //       setDisplayEvents(data);
  //     });
  // }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


    const handleSearch = (e) =>{
      // console.log(e.target.value)
      const searchText =  e.target.value;
      const matchedEventTitle = events.filter(event=>event.title.toLowerCase().includes(searchText.toLowerCase()));
      setDisplayEvents(matchedEventTitle)
    }

  return (
    <>
    <div className={`${classes.headerBanner} p-20`}>
        <div className="flex flex-col items-center justify-center h-full ">
          <h1 className="text-center text-3xl md:text-4xl lg:text-5xl poppins font-semibold text-white ">
            People Want you to help them.
          </h1>

          <div className="rounded-full p-1 box-border mt-8 bg-white overflow-hidden ring-red-300 focus:ring-4 w-96 flex items-center">
            <input
            onChange={handleSearch}
              type="text"
              className="rounded-full px-4 focus:outline-none w-full bg-transparent"
              placeholder="Search by event title."
            />
            <button className=" text-sm bg-indigo-700 py-3 px-6 rounded-full text-white poppins ring-indigo-300 focus:ring-4 transition duration-300 hover:scale-105 transform">
              Search
            </button>
          </div>
        </div>
    </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 mb-5">
    
    {displayEvents.map(event =>
      loading ? (
        <Skeleton key={event._id} />
      ) : (
        <Cards key={event._id} {...event} />
      )
    )}
  </div>
    </>
  );
};

export default Card;
