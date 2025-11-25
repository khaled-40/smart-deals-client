import React, { use, useRef } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';

const ProductDetails = () => {
    const {_id} = useLoaderData();
    const {user} = use(AuthContext);
    const bidModalRef = useRef();
    // console.log(product)
    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }
    const handleBidSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        console.log(_id, name, email, bid)
        const newBid = {
            product: _id,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user.photoURL,
            bid_price: bid,
            status: 'pending'
        }
        console.log(newBid)
        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(newBid)
        })
        .then(res => res.json())
        .then(data => {
            console.log('data after newbid', data.insertedId)
        })
    }
    return (
        <div>
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
                                    <input type="text" className="input" name='name' defaultValue={user.displayName} placeholder="Your Name" readOnly/>
                                    {/* Email field */}
                                    <label className="label">Email</label>
                                    <input type="email" className="input" name='email' defaultValue={user.email} placeholder="Your Email" readOnly/>
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
        </div>
    );
};

export default ProductDetails;