import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Reserve from '../Components/Reserve'

const SinglePlace = () => {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.post('/places/id', { id }).then(response => {
      setPlace(response.data.place)
      console.log(response.data)
      setLoading(false)
    })
    axios
      .get(`/bookings/${id}/reviews`)
      .then(response => {
        setReviews(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching reviews:', error)
      })
  }, [id])

  if (loading || place === null) {
    return 'Loading...'
  }

  return (
    <div className='mx-auto w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 mt-8 p-5'>
      <h1 className='font-semibold text-xl sm:text-2xl'>{place.title}</h1>
      <div className='flex flex-col sm:flex-row items-center mt-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 lg:mr-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
          />
        </svg>
        <p>{place.address}</p>
      </div>

      <div
        className='grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2'
        style={{ height: '240px' }}
      >
        {place.photos.slice(0, 4).map((photo, index) => (
          <div key={index} className='flex justify-center items-center'>
            <img
              src={`http://localhost:3000/uploads/${photo}`}
              alt=''
              className='max-w-full w-32 sm:w-auto h-32 sm:h-60'
            />
          </div>
        ))}
      </div>

      <div className='main flex flex-col lg:flex-row gap-2 mx-auto'>
        <div className='w-full lg:w-8/12 mt-8 pt-5'>
          <h4 className='font-semibold text-base sm:text-lg lg:text-xl mt-4 sm:mt-8'>
            About This Place
          </h4>
          <p className='my-2 sm:my-4'>{place.description}</p>

          <hr />
          <h4 className='font-semibold text-base sm:text-lg lg:text-xl mt-4 sm:mt-8'>
            What This Place Offers
          </h4>
          <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 capitalize text-center my-2 sm:my-4 gap-2'>
            {place.perks.map((perk, index) => (
              <li key={index} className='border rounded-lg p-2'>
                {perk}
              </li>
            ))}
          </ul>
          <h4 className='font-semibold text-base sm:text-lg lg:text-xl mt-4 sm:mt-8'>
            Other Things To Note
          </h4>
          <p className='my-2 sm:my-4'>{place.extraInfo}</p>
          <h4 className='font-semibold text-base sm:text-lg lg:text-xl mt-4 sm:mt-8'>
            Timings
          </h4>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2'>
            <div className='grid place-items-center'>
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
                  d='M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3'
                />
              </svg>
              Check In <br />
              <span className='font-semibold'>{place.checkIn}</span>
            </div>
            <div className='grid place-items-center'>
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
                  d='M9 9l6-6m0 0l6 6m-6-6v12a6 6 0 01-12 0v-3'
                />
              </svg>
              Check Out
              <span className='font-semibold'>{place.checkOut}</span>
            </div>
            <div className='grid place-items-center'>
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
                  d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                />
              </svg>
              Max Guests
              <span className='font-semibold'>{place.maxGuests}</span>
            </div>
          </div>
          <div className='mt-6'>
            <h4 className='font-semibold text-lg lg:text-xl'>Reviews</h4>
            <ul>
              {reviews.map((review, index) => (
                <li key={index} className='my-3'>
                  <h5 className='font-semibold'>{review.user.name}</h5>
                  <p>{review.review}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar Section */}

        <Reserve place={place} />
      </div>
    </div>
  )
}

export default SinglePlace
