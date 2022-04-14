// import { Button } from "@mui/material";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthProvider';
import NavBar from '../NavBar/NavBar';

const Login = () => {
    const {signInwithGoogle} = useAuth();
    const location = useLocation();
    const navigate = useNavigate()
    const redirect_url = location.state?.from?.pathname || "/";
    console.log('redirect url',redirect_url);
    
    const handleSignInWithGoogle = async () =>{
        try{
            await signInwithGoogle();
            navigate(`${redirect_url}`, { replace: true });
            toast.success("Welcome you are logged in Successfully,", {
                theme: "colored",
              });
        }
        catch(err){
            console.log(err.message);
        }
    };
    return (
        <>
        <NavBar/>
            <div className='m-5' >
        <h1 className="text-center  lg:text-5xl md:text-2xl text-primary poppins mb-5">Please login with google Account</h1>
      <button className="bg-blue-700 w-25 h-10 md:py-3 lg:py-2 md:px-10 lg:px-4 mt-20 rounded-full text-sm text-white font-semibold" onClick={handleSignInWithGoogle} variant="contained">
        LogIn With Google
      </button>
        </div>
        </>
    );
};

export default Login;