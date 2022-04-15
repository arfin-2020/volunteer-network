// import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthProvider";

const Login = () => {
  const { signInwithGoogle, currentUser, logOut, logInWithEmailPassword } =
    useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect_url = location.state?.from?.pathname || "/";
  //   console.log("redirect url", redirect_url);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
      e.preventDefault();
    if (email && password) {
    //   console.log(email, password);
    try{
        await logInWithEmailPassword(email,password,name);
        toast.success("Login sucessfull!",{
            position:"top-right",
            icon:"🚀",
            theme: "dark"
          });
          navigate("/")
    }catch(err){
        // console.log(err.message)
        toast.error("User not found!",{
            position:"top-right",
            theme: "dark"
          });
          
    }
    } else {
      toast.warning("Please Fill up the all field!", {
        position: "top-right",
        // icon:"🚀",
        theme: "dark",
      });
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInwithGoogle();
      navigate(`${redirect_url}`, { replace: true });
      toast.success("Welcome you are logged in Successfully,", {
        theme: "colored",
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  
  return (
    <>
      <div className="mt-20">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl poppins font-semibold text-indigo-700">
          Please login{" "}
        </h1>

        <form onSubmit={handleSubmit}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "70ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              type="name"
              id="standard-basic"
              label="Enter name"
              variant="standard"
              color="secondary"
              onChange={e => setName(e.target.value)}
            />
            <br />
            <TextField
              required
              type="email"
              id="standard-basic"
              label="Enter email"
              variant="standard"
              color="secondary"
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <TextField
              type="password"
              required
              id="standard-basic"
              label="Password"
              variant="standard"
              color="secondary"
              onChange={e => setPassword(e.target.value)}
            />
            <br />
          </Box>
          
          <div className="m-5">
            <button className="text-sm bg-indigo-700 py-3 px-6 rounded-full text-white poppins ring-indigo-300 focus:ring-4 transition duration-300 hover:scale-105 transform mr-3">
              login
            </button>
            <Link
              to="/signUp"
              className="text-sm bg-amber-600 py-3 px-6 rounded-full text-white poppins ring-indigo-300 focus:ring-4 transition duration-300 hover:scale-105 transform"
            >
              register
            </Link>
          </div>
        </form>
        
        <div>
          <p className="text-center text-3xl md:text-2xl lg:text-2xl poppins font-semibold text-black">
            Or
          </p>
          {!currentUser?.name ? (
            <button
              className="text-sm bg-indigo-700 py-3 px-6 rounded-full text-white poppins mt-3 ring-indigo-300 focus:ring-4 transition duration-300 hover:scale-105 transform mr-3"
              onClick={handleSignInWithGoogle}
              variant="contained"
            >
              LogIn With Google
            </button>
          ) : (
            <button
              className="bg-blue-700 w-25 h-10 md:py-3 lg:py-2 md:px-10 lg:px-4 mt-20 rounded-full text-sm text-white font-semibold"
              onClick={logOut}
              variant="contained"
            >
              LogOut
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
