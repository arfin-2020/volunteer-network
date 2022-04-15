import React from 'react';
import { useParams } from 'react-router-dom';

const PageNotFound = () => {
    const params = useParams();
    return (
        <div>
            <h1 className='text-center text-3xl md:text-4xl lg:text-5xl mt-20 poppins font-semibold text-red-700'>{params.pageName} page Not Found</h1>
        </div>
    );
};

export default PageNotFound;