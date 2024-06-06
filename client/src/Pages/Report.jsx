import axios from 'axios'
import { differenceInDays } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const Report = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    axios
      .get('/bookings/detail')
      .then(response => {
        setBookings(response.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h1 className='text-center font-bold text-4xl text-decoration-underline mb-5 mt-4 line'>Report</h1>
      <table className="table-auto border-1 mt-4 w-100">
        <thead>
          <tr className="bg-gray-200 text-dark-600 uppercase text-lg leading-normal text-center">
            <th className='p-1 text-decoration-underline'>User Name</th>
            <th className='p-1 text-decoration-underline'>Room Title</th>
            <th className='p-1 text-decoration-underline'>Booking Date</th>
            <th className='p-1 text-decoration-underline'>Booked Meals</th>
            <th className='p-1 text-decoration-underline'>Total Price</th>
            <th className='p-1 text-decoration-underline'>Booking Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr className="border-b text-center p-3 text-dark-700 text-md hover:bg-gray-100" key={index}>
              <td className='border-3 p-2'>
                {booking.fullName}
              </td>
              <td className='border-3 p-2 cursor-pointer'>
                <Link to={`/singlePlace/${booking.place._id}`}>
                  {booking.place.title}
                </Link>
              </td>
              <td className='border-3 p-2'>
                {booking.checkIn} - {booking.checkOut}
              </td>
              <td className='border-3 p-2'>
                {Array.isArray(booking.meals)
                  ? booking.meals.join(', ')
                  : booking.meals}
              </td>
              <td className='border-3 p-2'>
                ₹{booking.price}
              </td>
              <td className='border-3 p-2'>
                {booking.status.toString() === "true" ? "Booked" : "Cancelled"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Report
