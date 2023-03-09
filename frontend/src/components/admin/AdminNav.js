import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminNav = () => {
    return (
        <ul className="nav nav-tabs justify-content-center px-4 mt-2">
            <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/products">All Products</NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/product">Create Product</NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/reviews">Reviews</NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/users">Users</NavLink>
            </li>
        </ul>
    )
}

export default AdminNav