import { useEffect, useState } from 'react';

const UseFetch = () => {
    const [events, setEvents] = useState([]);
    const [displayEvents, setDisplayEvents] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/events")
          .then(res => res.json())
          .then(data => {
            setEvents(data);
            setDisplayEvents(data);
          });
      }, []);
    return [events,setEvents,displayEvents,setDisplayEvents]

};

export default UseFetch;