import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/UseAxiosSecure';


const MyBids = () => {
    const [bids, setBids] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = use(AuthContext);

    // console.log(user?.accessToken)
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/bids?email=${user?.email}`)
            .then(data => {
                setBids(data.data)
            })

        }
    }, [user,axiosSecure])
    // useEffect(() => {
    //     if (user?.email) {

    //         fetch(`http://localhost:3000/bids?email=${user?.email}`, {
    //             headers: {
    //                 authorization: `Bearer ${localStorage.getItem('smart-deals-token')}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log('my bids', data);
    //                 setBids(data);
    //             })
    //     }
    // }, [user])
    // useEffect(() => {
    //     if (user?.email) {

    //         fetch(`http://localhost:3000/bids?email=${user?.email}`, {
    //             headers: {
    //                 authorization: `Bearer ${user.accessToken}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log('my bids', data);
    //                 setBids(data);
    //             })
    //     }
    // }, [user?.email])
    // console.log(bids)
    const handleBidDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('deleted')
                fetch(`http://localhost:3000/bids/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });
                            const remainingBids = bids.filter(bid => bid._id !== id);
                            setBids(remainingBids)
                        }
                    })

            }
        });
    }
    return (
        <div>
            <h2 className='text-3xl font-bold text-center my-8'>My Bids : <span className='text-purple-800'>{bids.length}</span></h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                SL NO
                            </th>
                            <th>Name</th>
                            <th>Seller</th>
                            <th>Bid Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                                    src={user?.photoURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user?.displayName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>{bid.bid_price}</td>
                                <td className=' mt-5'>
                                    {
                                        bid.status === 'pending' ?
                                            <div className='badge badge-warning'>{bid.status}</div> :
                                            <div className='badge badge-success'>{bid.status}</div>
                                    }
                                </td>
                                <th>
                                    <button onClick={() => { handleBidDelete(bid._id) }} className="btn btn-outline btn-error">Remove Bid</button>
                                </th>
                            </tr>)
                        }
                        {/* row 1 */}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;