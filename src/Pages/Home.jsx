import React from 'react';
import LatestProducts from '../Components/LatestProducts';

const Home = () => {
    const productPromise = fetch('http://localhost:3000/latest-products').then(res => res.json());
    return (
        <div>
           <h1 className='text-center text-5xl pt-6'>Recent <span className='bg-linear-to-br from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Products</span></h1>
           <LatestProducts productPromise={productPromise}></LatestProducts> 
        </div>
    );
};

export default Home;