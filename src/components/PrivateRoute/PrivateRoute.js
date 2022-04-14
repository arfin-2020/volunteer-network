import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';

const PrivateRoute = () => {
    const {currentUser,isLoading} = useAuth();
    const location = useLocation();
    // console.log(currentUser.name);

    if(isLoading){
        return <p>loading</p>
    }
    
    return currentUser?.name ?(
        <Outlet/>
    ) :(
        <Navigate to='/login' state={{from: location}} replace/>
    )
};

export default PrivateRoute;