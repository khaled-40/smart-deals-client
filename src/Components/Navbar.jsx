import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import './Header.css'
import '../App.css'
import { AuthContext } from '../Contexts/AuthContext';



const Navbar = () => {
    const { signOutUser, user } = use(AuthContext);
    // console.log(user.photoURL)


    const links = <>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/allproducts'}>All Products</NavLink>
        {
            user && <>
                <NavLink to={'/myproducts'}>My Products</NavLink>
                <NavLink to={'/mybids'}>My Bids</NavLink>
            </>
        }
        <NavLink to={'/createproducts'}>Create Products</NavLink>

    </>

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                alert('user has been signed out')
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Smart<span className='bg-linear-to-br from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Deals</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-6">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className='flex'>
                            <button onClick={handleSignOut} className="btn btn-outline btn-primary">Sign Out</button>
                            <img className="w-10 h-10 rounded-full ml-2" src={user?.photoURL} alt="" />
                        </div> :
                        <Link className='btn btn-primary
                        ' to={'/register'}>Register</Link>
                }

            </div>
        </div>
    );
};

export default Navbar;