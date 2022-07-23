import React, { useState } from 'react'
import { UserCircle, EnvelopeSimple, Lock } from 'phosphor-react'
import { createUsers } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';



const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, success, RegisterError } = useSelector((state) => state.userReducer)


  const onSubmiHandler = async (event) => {
    event.preventDefault()
    try {
      if (password !== confirm) {
        toast.error("password Should Match")
      } else {
        await dispatch(createUsers({ name, email, password })).unwrap();
        toast.success("Successfully registered")
        navigate('/login')
      }
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className="form-box rounded">


        <h3 className="mb-4">Sign up for free</h3>
        <form onSubmit={onSubmiHandler} className="d-flex flex-column gap-2">
          <div className="form-element">
            <UserCircle className="icon" size={28} />
            <input
            autoFocus
              required
              type="text"
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-element">
            <EnvelopeSimple className="icon" size={28} />
            <input
              required
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="form-element">
            <Lock className="icon" size={28} />
            <input
              required
              type="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-element">
            <Lock className="icon" size={28} />
            <input
              required
              type="Password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <span className="m-2">Go Back to<Link className="Link" to={`/login`}>Login</Link> </span>

          <div>
            <button type='submit' className="mt-2">
              {loading ? <Loader /> : 'register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
