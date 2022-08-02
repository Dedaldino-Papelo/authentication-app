import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../features/user/userSlice'
import { useDispatch } from 'react-redux/es/exports'

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
const { userInfo } = useSelector((state) => state.userReducer)  


 const logoutHandler = () =>{
  dispatch(logout())
 }

 return (
    <div>
      <div className='d-flex justify-content-between bg-dark text-white text-center text-uppercase p-4'>
        <div>
          <Link style={{color: '#fff', margin: '10px', textDecoration: 'none'}} to={`/login`} >Login</Link>
          <Link style={{color: '#fff', margin: '10px', textDecoration: 'none'}} to={`/register`} >Register</Link>
          
          {userInfo && userInfo.Name ? (
            <Link to='#' onClick={logoutHandler} style={{color: '#fff', margin: '10px', textDecoration: 'none'}} >Logout</Link>
          ): ''}
          
        </div>
        <span>{userInfo && userInfo.Name ? 'Logged In as ' + userInfo.Name : ''}</span> 
      </div>
    </div>
  )
}

export default Home
