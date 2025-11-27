import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { _id: productId } = useLoaderData();
    const [bids, setBids] = useState([])
    const { user } = use(AuthContext);
    const bidModalRef = useRef();
    // console.log(product)
    console.log(bids)

    useEffect(() => {
        fetch(`http://localhost:3000/product/bids/${productId}`)
            .then(res => res.json())
            .then(data => {
                setBids(data)
            })
    }, [productId])

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }
    const handleBidSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        // console.log(_id, name, email, bid)
        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,
            bid_price: bid,
            status: 'pending'
        }
        console.log(newBid)
        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    bidModalRef.current.close();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    newBid._id = data.insertedId;
                    const newBids = [...bids,newBid];
                    newBids.sort((a,b) => b.bid_price - a.bid_price)
                    setBids(newBids)
                }
            })
    }
    return (
        <div>
            {/* Product Info */}
            <div>
                <div>

                </div>
                <div>
                    <button onClick={handleBidModalOpen} className="btn btn-primary">I want to buy this product</button>

                    {/* Open the modal using document.getElementById('ID').showModal() method */}

                    <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Give the best deals</h3>
                            <p className="py-4">Offer something seller can't resist</p>
                            <form onSubmit={handleBidSubmit}>
                                <fieldset className="fieldset">
                                    {/* Name field */}
                                    <label className="label">Name</label>
                                    <input type="text" className="input" name='name' defaultValue={user?.displayName} placeholder="Your Name" readOnly />
                                    {/* Email field */}
                                    <label className="label">Email</label>
                                    <input type="email" className="input" name='email' defaultValue={user?.email} placeholder="Your Email" readOnly />
                                    {/* Bid field */}
                                    <label className="label">Bid</label>
                                    <input type="text" className="input" name='bid' placeholder="Your Bid" />

                                    <button className="btn btn-neutral mt-4">Place Your Bid</button>
                                </fieldset>
                            </form>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
            {/* Product Bids */}
            <div>
                <h2 className='text-3xl font-bold mb-5'>Bids For This Product:
                    <span className='text-purple-800'>{bids.length}</span></h2>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    SL NO
                                </th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Bid Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                bids.map((bid, index) => <tr key={bid._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={bid.buyer_image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{bid.buyer_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {bid.buyer_email}
                                    </td>
                                    <td>{bid.bid_price}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>)
                            }


                        </tbody>

                    </table>
                </div>


            </div>
        </div>
    );
};

export default ProductDetails;