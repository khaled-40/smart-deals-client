import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/UseAuth';

const CreateProducts = () => {
    const {user} = useAuth();
    const handleCreateProduct = e => {
        e.preventDefault();
        const title = e.target.title.value;
        const image = e.target.image.value;
        const price_min = e.target.price_min.value;
        const price_max = e.target.price_max.value;
        const newProduct = { title, image, price_min, price_max,
            email: user?.email,
            seller_name: user?.displayName
        };
        axios.post('http://localhost:3000/products',newProduct)
            .then(data => {
                console.log(data.data);
                if (data.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your product has been created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div className='lg:w-1/2 mx-auto'>
            <form onSubmit={handleCreateProduct}>
                <fieldset className="fieldset">
                    {/*Product Title field */}
                    <label className="label">Title</label>
                    <input type="text" className="input" name='title' placeholder="Your Product Name" />
                    {/*Image field */}
                    <label className="label">Image URL</label>
                    <input type="text" className="input" name='image' placeholder="Product Image" />
                    {/* Min Price */}
                    <label className="label">Min_Price</label>
                    <input type="number" className="input" name='price_min' />
                    {/* Max Price */}
                    <label className="label">Max_Price</label>
                    <input type="number" className="input" name='price_max' />

                    <button className="btn btn-neutral mt-4">Create Your Product</button>
                </fieldset>
            </form>
        </div>
    );
};

export default CreateProducts;