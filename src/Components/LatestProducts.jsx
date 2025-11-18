import  { use } from 'react';
import Product from './Product';

const LatestProducts = ({productPromise}) => {
    const products = use(productPromise);
    console.log(products)
    return (
        <div className=''>
            {
                products.map(product => <Product key={product._id} product={product}></Product>)
            }
        </div>
    );
};

export default LatestProducts;