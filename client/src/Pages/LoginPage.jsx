import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { useDispatch } from 'react-redux'
import { showSnakbar } from '../store/slices/snakbar'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const LoginPage = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false) // State to manage password visibility
  const [redirect, setRedirect] = useState(false)
  const { setUser } = useContext(UserContext)

  const loginHandler = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('/login', { email, password })
      if (response.status === 200) {
        setUser(response.data)
        localStorage.setItem('email', response.data.email)

        dispatch(
          showSnakbar({
            message: `Login successful`,
            open: true,
            type: 'success'
          })
        )
        setRedirect(true)
      }
    } catch (err) {
      dispatch(
        showSnakbar({
          message: `${err.response.data.message}`,
          open: true,
          type: 'error'
        })
      )
    } finally {
      setEmail('')
      setPassword('')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='login'>
      <div className='w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 mx-auto mt-8 flex flex-col border border-gray-300 rounded-lg '>
        <h3 className='text-center py-5 px-4 font-bold'>Log in</h3>
        <form className='p-3' onSubmit={loginHandler}>
          <input
            type='email'
            placeholder='Enter email'
            className='w-full rounded-lg p-2 border mb-3'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className='relative'>
            <button
              type='button'
              className='absolute top-1/3 right-3 transform -translate-y-1/4'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter password'
              className='w-full rounded-lg p-2 border mb-3 pr-10' // Added pr-10 for padding to accommodate the button
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='w-full bg-primary py-2 px-3 text-white rounded-lg mb-3 d-flex justify-center'>
            Login
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className='ml-2'
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M7.03315 12.0065H13.008M13.008 12.0065C13.008 12.5743 11.1339 14.0151 11.1339 14.0151M13.008 12.0065C13.008 11.424 11.1339 10.021 11.1339 10.021M16.0332 9.01074V15.0107"
                stroke="currentColor"
                strokwidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className='text-center'>
            <span>Don't have an account?</span>{' '}
            <Link to='/register' className='underline'>
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
