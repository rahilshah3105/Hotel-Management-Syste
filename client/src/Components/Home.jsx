import React, { useEffect, useState } from 'react'
import axios, { all } from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [allPlaces, setallPlaces] = useState([])
  useEffect(() => {
    axios.get('/allPlaces').then((response) => {
      setallPlaces(response.data)
    })
  }, [])
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-8 gap-y-8'>
      {allPlaces.length > 0 && allPlaces.map((place, index) => (
        <Link key={index} to={'/singlePlace/' + place._id} className="flex flex-col items-center">
          <img src={`http://localhost:3000/uploads/` + place.photos[0]} alt="" className='object-cover h-56 w-60' />
          <h2 className='mt-4 font-semibold text-center'>{place.title}</h2>
          <p className='text-sm text-center'>{place.address}</p>
          <h2 className='font-semibold text-sm text-center'>₹{place.price} per night</h2>
        </Link>
      ))}
    </div>

  )
}

export default Home