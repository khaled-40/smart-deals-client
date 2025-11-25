import  { use } from 'react';
import Product from './Product';

const LatestProducts = ({productPromise}) => {
    const products = use(productPromise);
    console.log(products)
    return (
        <div className='max-w-[1200px] mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                products.map(product => <Product key={product._id} product={product}></Product>)
            }
        </div>
    );
};

export default LatestProducts;