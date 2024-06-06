import React, { useEffect, useState } from 'react'
import Perks from '../Components/Perks'
import axios from 'axios'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showSnakbar } from '../store/slices/snakbar'

const AddPlace = () => {
  const dispatch = useDispatch()

  const { id } = useParams()
  // console.log("dasdsa", id)

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [photoLink, setPhotoLink] = useState('')
  const [addedPhotos, setaddedPhotos] = useState([])
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  const [price, setPrice] = useState(0)
  const [mealTypeLink, setMealTypeLink] = useState('')
  const [mealPriceLink, setMealPriceLink] = useState('')
  const [mealType, setMealType] = useState([])
  const [mealPrice, setMealPrice] = useState([])
  const [meals, setMeals] = useState([])
  // const [mealPrice,setMealPrice] = useState([]);


  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (id) {
      axios.post('/places/id', { id }).then(response => {
        console.log(response.data.place)
        const {
          title,
          address,
          photos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
          meals
        } = response.data.place

        setTitle(title)
        setAddress(address)
        setaddedPhotos(photos)
        setDescription(description)
        setPerks(perks)
        setExtraInfo(extraInfo)
        setCheckIn(checkIn)
        setCheckOut(checkOut)
        setMaxGuests(maxGuests)
        setPrice(price)
        // setMeals(meals)

        setMealType(meals.mealType)
        setMealPrice(meals.mealPrice)
      })

    }
    // console.log(mealType)
  }, [])

  const addMeal = async e => {
    e.preventDefault()
    if (mealTypeLink && mealPriceLink) {
      setMealType([...mealType, mealTypeLink])
      setMealPrice([...mealPrice, mealPriceLink])
      setMealTypeLink('')
      setMealPriceLink('')
    }
  }
  const addLinkPhoto = async e => {
    e.preventDefault()
    let filename
    const { data } = await axios.post('/uploads', { link: photoLink })
    filename = data.newName
    setaddedPhotos(prev => [...prev, filename])
    setPhotoLink('')
  }

  const removePhoto = photo => {
    setaddedPhotos([...addedPhotos.filter(image => image !== photo)])
  }

  const savePlace = async e => {
    e.preventDefault()
    const updatedMeals = {
      mealType,
      mealPrice
    }

    console.log(updatedMeals)

    setMeals({ mealType, mealPrice })


    const placeData = {
      id,
      title,
      address,
      addedPhotos,
      description,
      price,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      updatedMeals
    }

    try {
      const response = id
        ? await axios.put('/places', placeData)
        : await axios.post('/places', placeData)
      setRedirect(true)
      if (response.status === 201) {
        {
          id
            ? dispatch(
              showSnakbar({
                message: `place updated successfully`,
                open: true,
                type: 'success'
              })
            )
            : dispatch(
              showSnakbar({
                message: `place saved successfully`,
                open: true,
                type: 'success'
              })
            )
        }
      }
    } catch (err) {
      dispatch(
        showSnakbar({
          message: `${err}`,
          open: true,
          type: 'error'
        })
      )
    }
  }

  if (redirect) {
    return <Navigate to='/account' />
  }

  return (
    <div className='mx-auto w-full sm:w-10/12 lg:w-8/12 mt-8 p-3'>
      <form onSubmit={savePlace} className='space-y-2'>
        <h2 className='text-2xl'>Title</h2>
        <p className='text-sm text-gray-500'>Title for your place</p>
        <input
          type='text'
          placeholder='Enter the title of your place'
          className='w-full border rounded-lg px-4 py-2'
          onChange={e => setTitle(e.target.value)}
          value={title}
          required
        />

        <h2 className='text-2xl mt-4'>Address</h2>
        <p className='text-sm text-gray-500'>Address to this place</p>
        <input
          type='text'
          placeholder='Enter the address of your place'
          className='w-full border rounded-lg px-4 py-2'
          onChange={e => setAddress(e.target.value)}
          value={address}
          required
        />

        <h2 className='text-2xl mt-4'>Photos</h2>
        <div className='flex items-center gap-2'>
          <input
            type='text'
            placeholder='Add photo using link'
            className='border rounded-lg px-4 py-2 w-full'
            onChange={e => setPhotoLink(e.target.value)}
            value={photoLink}
          />
          <button
            className='bg-gray-300 rounded-lg px-4 py-2'
            onClick={addLinkPhoto}
          >
            Add Photo
          </button>
        </div>
        <div className='grid md:grid-cols-4 lg:grid-cols-6 grid-cols-3 gap-2'>
          {addedPhotos.length > 0 &&
            addedPhotos.map((photo, index) => (
              <div key={index} className='relative'>
                <img
                  src={`http://localhost:3000/uploads/` + photo}
                  alt=''
                  className='rounded-2xl mt-4 h-28 w-96 '
                />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5 absolute right-3 bottom-3 p-0.5 cursor-pointer bg-white rounded-2xl'
                  onClick={() => {
                    removePhoto(photo)
                  }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
              </div>
            ))}

          <label className='border bg-transparent cursor-pointer rounded-2xl p-8 flex justify-center items-center gap-2 mt-4'>
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
                d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
              />
            </svg>
            Upload
          </label>
        </div>
        <h2 className='text-2xl mt-4'>Description</h2>
        <p className='text-sm text-gray-500'>Description for your place</p>
        <textarea
          name=''
          id=''
          className='w-full border rounded-lg px-4 py-2'
          rows='5'
          onChange={e => setDescription(e.target.value)}
          value={description}
          required
        ></textarea>
        <h2 className='text-2xl mt-4'>Check-in Time</h2>
        <input
          type='time'
          className='w-full border rounded-lg px-4 py-2'
          onChange={e => setCheckIn(e.target.value)}
          value={checkIn}
          required
        />

        <h2 className='text-2xl mt-4'>Check-out Time</h2>
        <input
          type='time'
          className='w-full border rounded-lg px-4 py-2'
          onChange={e => setCheckOut(e.target.value)}
          value={checkOut}
          required
        />
        <Perks selected={perks} onChange={setPerks} />
        <h2 className='text-2xl mt-4'>Extra Info</h2>
        <p className='text-sm text-gray-500'>Add extra info for your place</p>
        <textarea
          name=''
          id=''
          className=''
          rows='2'
          onChange={e => setExtraInfo(e.target.value)}
          value={extraInfo}
        ></textarea>

        <h2 className='text-2xl mt-4'>Pricing & Guests</h2>
        <p className='text-sm text-gray-500'>
          Enter your check in and check out time along with number of guests
        </p>

        <div className='grid lg:grid-cols-4  gap-3'>
          <div>
            <h2>Guests Per Room</h2>
            <input
              type='number'
              className='w-full border rounded-2xl px-4 py-1'
              onChange={e => setMaxGuests(e.target.value)}
              value={maxGuests}
              required
            />
          </div>
          <div>
            <h2>Price</h2>
            <input
              type='number'
              className='w-full border rounded-2xl px-4 py-1'
              onChange={e => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
        </div>

        {/* {!id && <> */}
        <h2 className='text-2xl mt-4'>Meals</h2>
        <p className='text-sm text-gray-500'>
          Enter meal options and their prices
        </p>

        <div>
          <div className='flex items-center gap-2 mt-2 mb-1'>
            <select
              value={mealTypeLink}
              onChange={e => setMealTypeLink(e.target.value)}
              className='rounded-lg p-1.5'
            >
              <option value=''>Select</option>
              <option value='Breakfast'>Breakfast</option>
              <option value='Lunch'>Lunch</option>
              <option value='Dinner'>Dinner</option>
            </select>
            <input
              type='number'
              placeholder='Price'
              value={mealPriceLink}
              onChange={e => setMealPriceLink(e.target.value)}
            />
            <button
              className='bg-gray-300 rounded-full px-4 py-2 mt-2'
              onClick={addMeal}
            >
              Add
            </button>
          </div>

          {/* <button
            className='bg-gray-300 rounded-full px-4 py-2 mt-2'
            onClick={addMeal}
          >
            Add New Meal
          </button> */}

          {mealType.length > 0 && (
            <div>
              <h2 className='text-xl mt-4'>Existing Meals and Prices</h2>
              {mealType.map((meal, index) => (
                <div key={index} className='flex items-center gap-2 mt-2'>
                  <span>
                    {meal}: ₹{mealPrice[index]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* </>} */}
        <button
          className='bg-primary rounded-full px-4 py-2 mt-4 text-white w-full'
          type='submit'
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default AddPlace
