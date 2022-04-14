import React from "react";
import { useNavigate } from "react-router-dom";

const Cards = ({ img, _id, title }) => {
    const navigate = useNavigate();
    const handleRegister = (id) =>{
        navigate(`register/${id}`)
    }
  return (
    <div className="transition transform duration-700 hover:scale-105 p-4 rounded-lg relative">
      <button className=" text-black px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105" 
        onClick={()=>handleRegister(_id)}>
       <img
        className="w-64 mx-auto transform transition duration-300 hover:scale-105"
        src={img}
        alt=""
      />
        </button>
      <div className="flex flex-col items-center my-3 space-y-2">
        <h1 className="text-gray-900 poppins text-lg">{title}</h1>
        

        
      </div>
    </div>
  );
};

export default Cards;
