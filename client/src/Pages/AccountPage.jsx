import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import BookingPage from './BookingPage'
import { useDispatch } from 'react-redux'
import { showSnakbar } from '../store/slices/snakbar'

const AccountPage = () => {
  const dispatch = useDispatch()

  const { user, ready, setUser } = useContext(UserContext)
  const email = localStorage.getItem('email')

  const { action } = useParams()

  if (ready && !user) {
    return <Navigate to='/login' />
  }

  const userLogout = () => {
    axios.get('/logout').then(response => {
      dispatch(
        showSnakbar({
          message: `Logged out successfully`,
          open: true,
          type: 'success'
        })
      )
      setUser(null)
    })
  }

  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = 'profile'
  }
  function linkClasses(type = null) {
    let classes = 'px-6 py-2 rounded-full inline-flex gap-1'
    if (type == subpage) {
      classes += ' bg-primary text-white'
    } else {
      classes += ' bg-gray-200'
    }
    return classes
  }
  return (
    <>
      <div className='flex flex-col sm:flex-row p-2 justify-center gap-2 mt-8'>
        <Link to='/account/' className={linkClasses('profile')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          Profile
        </Link>
        {!(email === 'admin@admin.com') && (
          <Link to='/account/bookings' className={linkClasses('bookings')}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
              />
            </svg>
            My Bookings
          </Link>
        )}
        {email === 'admin@admin.com' && (
          <>
            <Link to='/account/places' className={linkClasses('places')}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                />
              </svg>
              My Accommodations
            </Link>
            <Link to='/allbookings' className={linkClasses('places')}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                />
              </svg>
              Recent Bookings
            </Link>
            <Link to='/report' className={linkClasses('places')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                className='mr-1'
              >
                <path
                  d="M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3" stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M13 10L13 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 13L18 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 13L8 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 7.98693C19.16 7.98693 17.1922 8.24252 15.8771 6.49346C14.3798 4.50218 11.6202 4.50218 10.1229 6.49346C8.80782 8.24252 6.84003 7.98693 5 7.98693H3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Report
            </Link>
          </>
        )}
      </div>

      {subpage === 'profile' && (
        <div className='mx-auto sm:w-6/12 mt-8 p-4'>
          <h2 className='text-2xl font-bold'>Personal Info</h2>
          <h4 className='mt-5 font-semibold text-lg'>Legal Name</h4>
          <p className='mb-5'>{user?.name}</p>
          <hr />

          <h4 className='mt-5 font-semibold text-lg'>Email Address</h4>
          <p className='mb-5'>{user?.email}</p>
          <hr />
          <button
            onClick={userLogout}
            className='bg-primary px-6 py-2 text-white rounded-full mt-5 d-flex w-30'
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              className='mr-2'
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5" />
              <path d="M17.0001 12.0065H11.0252M11.0252 12.0065C11.0252 12.5743 12.8993 14.0151 12.8993 14.0151M11.0252 12.0065C11.0252 11.424 12.8993 10.021 12.8993 10.021M8 9.01074V15.0107"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Logout
          </button>
        </div>
      )}

      {subpage === 'places' && email === 'admin@admin.com' && <PlacesPage />}

      {subpage === 'bookings' && <BookingPage />}
    </>
  )
}

export default AccountPage
