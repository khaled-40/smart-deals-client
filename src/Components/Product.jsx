import React from 'react';
import { Link } from 'react-router';

const Product = ({product}) => {
    const {title,price_min,price_max, usage,_id} = product;
    return (
        <div className="bg-base-100 mt-12 shadow-sm">
            <figure className="px-5 pt-5">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}-[{usage}]</h2>
                <p className='text-violet-900'>Price: ${price_min}-{price_max}</p>
                <div className="card-actions">
                    <Link to={`/appdetails/${_id}`}><button className="btn w-full btn-primary">View Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Product;