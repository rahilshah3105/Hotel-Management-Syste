import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showSnakbar } from '../store/slices/snakbar';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', {
        name,
        email,
        password,
      });
      setRedirect(true);
      if (response.status === 201) {
        dispatch(
          showSnakbar({
            message: `User registered successfully!`,
            open: true,
            type: 'success',
          })
        );
      }

      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      dispatch(
        showSnakbar({
          message: `${err.response.data.message}`,
          open: true,
          type: 'success',
        })
      );
      setName('');
      setEmail('');
      setPassword('');
    }
  };
  if (redirect) {
    return <Navigate to={'/login'} />;
  }
  return (
    <div className='login'>
      <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto mt-8 flex flex-col border border-gray-300 rounded-lg'>
        <h3 className='text-center py-5 px-4 font-bold'>Register</h3>
        <hr />
        <form className='p-3' onSubmit={registerUser}>
          <input
            type='text'
            placeholder='Your Name'
            className='w-full rounded-2xl p-2 border'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type='email'
            placeholder='Enter email'
            className='w-full rounded-2xl p-2 border mt-3'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className='relative'>
            <button
              type='button'
              className='absolute top-1/2 right-3 transform -translate-y-1/4'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter password'
              className='w-full rounded-2xl p-2 border mt-3'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='w-full bg-primary py-2 px-3 mt-2 text-white rounded-2xl mb-3'>
            Register
          </button>
          <span className='text-center block'>
            Already have an account?{' '}
            <Link to='/login' className='underline'>
              Login Now
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
