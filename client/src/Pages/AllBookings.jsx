import axios from 'axios'
import { differenceInDays } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AllBookings = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    axios
      .get('/bookings/detail')
      .then(response => {
        console.log(response.data)
        setBookings(response.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className='container'>
      <h1 className='text-center font-bold text-3xl text-decoration-underline mb-4 mt-4'>Recent Bookings</h1>
      <div className='row row-cols-12 row-cols-sm-2 g-4 mt-4 m-auto'>
        {bookings.map((booking, index) => (
          <Link to={`/singlePlace/${booking.place._id}`} className='row g-4'>
            <div className='row justify-content-center'>
              <div className='border p-3 cursor-pointer' key={index}>
                {/* <div className='col-lg-6 col-12'>
                  <img src={`http://localhost:3000/uploads/${booking.place.photos[0]}`} alt="Room Image" />
                </div> */}
                <div className='col-12 m-1'>
                  <h4 className='text-xl fw-bold'>Booked By {booking.fullName}</h4>
                  <h4 className='text-xl fw-bold'>{booking.place.title}</h4>
                  <div className='row align-items-center'>
                    <div className='col-12'>
                      <p className='d-flex align-items-center'>
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
                            d='M21.752 15.002A7.5 7.5 0 0018 15.75c-4.136 0-7.5-3.364-7.5-7.5 0-1.024.165-1.996.467-2.895A7.5 7.5 0 003 11.25C3 16.386 6.364 19.75 11.5 19.75c5.137 0 8.5-3.364 8.5-8.5z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M8.5 11.75s1.5-2 4.5-2 4.5 2 4.5 2'
                          />
                        </svg>
                        {differenceInDays(
                          new Date(booking.checkOut),
                          new Date(booking.checkIn)
                        )}{' '}
                        Nights
                      </p>
                      <p className='d-flex align-items-center gap-1'>
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
                            d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-18 0h13.5'
                          />
                        </svg>
                        {booking.checkIn}
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
                            d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5'
                          />
                        </svg>
                        {booking.checkOut}
                      </p>
                      <b>
                        {Array.isArray(booking.meals)
                          ? booking.meals.join(', ')
                          : booking.meals}
                      </b>
                      <p className='fw-bold text-lg'>
                        Total Price: ₹{booking.price}
                      </p>
                      <p className='text-sm'>
                        Booking Status: {booking.status.toString() === "true" ? ("Booked") : ("Canelled")}
                      </p>
                      <p className='text-sm'>
                        Razorpay Id: {booking.razorpay_payment_id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllBookings
