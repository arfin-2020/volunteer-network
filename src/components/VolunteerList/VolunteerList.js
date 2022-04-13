import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';

const VolunteerList = () => {
    const [volunteerList, setVoluenteerList] = useState([]);

    // console.log(volunteerList)
    useEffect(()=>{
        fetch('http://localhost:5000/allVoluenteer')
        .then(res=>res.json())
        .then(data=>setVoluenteerList(data))
    },[])
    return (
        <div>
        <NavBar/>
        <div className="py-4">
            <h1 className="text-center text-2xl md:text-4xl lg:text-2xl text-indigo-500 poppins font-semibold mb-2" >Volunteer Register list</h1>
            <table className ="table table-white table-hover container">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Register Date</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        volunteerList.map((volunteer,index)=>(
                            <tr key={volunteer._id}>
                                <th scope="row">{index+1}</th>
                                <td>{volunteer.name}</td>
                                <td>{volunteer.email}</td>
                                <td>{volunteer.date}</td>
                               
                                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default VolunteerList;