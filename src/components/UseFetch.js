import { useEffect, useState } from 'react';

const UseFetch = () => {
    const [events, setEvents] = useState([]);
    const [displayEvents, setDisplayEvents] = useState([]);
    useEffect(() => {
        fetch("https://powerful-bastion-35071.herokuapp.com/events")
          .then(res => res.json())
          .then(data => {
            setEvents(data);
            setDisplayEvents(data);
          });
      }, []);
    return [events,setEvents,displayEvents,setDisplayEvents]

};

export default UseFetch;