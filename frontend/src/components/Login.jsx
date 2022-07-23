import React, { useEffect } from 'react'
import { EnvelopeSimple, Lock } from 'phosphor-react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/user/userSlice';
import Loader from './Loader';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const Location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, LoginError, userInfo } = useSelector((state) => state.userReducer)

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/')
    } catch (error) {
      // do something
      console.log(error)
    }
  }

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className="form-box rounded">
        <h3 className="mb-4">Sign in </h3>
        <form onSubmit={submitHandler} className="d-flex flex-column gap-2">

          <div className="form-element">
            <EnvelopeSimple className="icon" size={28} />
            <input type="email" placeholder="Email" required autoFocus
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-element">
            <Lock className="icon" size={28} />
            <input type="Password" placeholder="Password" required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="mt-2">
            {loading ? <Loader />: 'Login'}
              </button>
          </div>
          <span className="m-2">Não tem uma conta?<Link className="Link" to={`/register`}>Registre-se</Link> </span>
        </form>
      </div>
    </div>
  )
}

export default Login
