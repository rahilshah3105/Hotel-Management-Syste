import React, { useContext, useEffect, useState } from 'react'
import { differenceInDays } from 'date-fns'
import axios from 'axios'
import { UserContext } from '../UserContext'
import useRazorpay from 'react-razorpay'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showSnakbar } from '../store/slices/snakbar'

const Reserve = ({ place }) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { user, ready, setUser } = useContext(UserContext)
  const [Razorpay] = useRazorpay()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [redirect, setRedirect] = useState(false)

  const [loading, setLoading] = useState(true)
  const [selectedMeals, setSelectedMeals] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)
  let status = false
  const [mealType, setMealType] = useState('veg')
  const [phoneError, setPhoneError] = useState('')

  useEffect(() => {
    setLoading(false)
  }, [user])

  useEffect(() => {
    calculateTotalPrice()
  }, [selectedMeals, numberOfGuests, checkIn, checkOut])

  let numberOfNights = 0
  if (checkIn && checkOut) {
    numberOfNights = differenceInDays(new Date(checkOut), new Date(checkIn))
  }

  const makeBooking = async (razorpay_payment_id, status) => {
    const response = await axios.post('/bookings', {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      fullName,
      phone,
      price: totalPrice,
      meals: Object.keys(selectedMeals),
      mealType,
      razorpay_payment_id,
      status
    })
    if (response.status === 201) {
      dispatch(
        showSnakbar({
          message: `Place booked successfully!!`,
          open: true,
          type: 'success'
        })
      )
      setRedirect(true)
    } else {
      dispatch(
        showSnakbar({
          message: `Please login first`,
          open: true,
          type: 'error'
        })
      )
    }
  }

  const handlePayment = async () => {
    if (user === null) {
      dispatch(
        showSnakbar({
          message: `Please Login First!!`,
          open: true,
          type: 'error'
        })
      )
      navigate('/login')
    } else {
      const options = {
        key: 'rzp_test_X9xMqy5AcCDQPE',
        key_secret: 'USJRHFTTLQg8xXlYyWaTfHNu',
        amount: totalPrice * 100,
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        handler: function (response) {
          status = true
          makeBooking(response.razorpay_payment_id, status)
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          color: '#3399cc'
        }
      }

      const rzp1 = new Razorpay(options)

      rzp1.on('payment.failed', function (response) {
        status = false
        makeBooking(response.razorpay_payment_id, status)
        dispatch(
          showSnakbar({
            message: `${response.error.code}`,
            open: true,
            type: 'error'
          })
        )
      })

      rzp1.open()
    }
  }

  const handleMealSelect = (mealType, price) => {
    // Check if the meal is already selected
    if (selectedMeals.hasOwnProperty(mealType)) {
      // Meal is already selected, so unselect it
      const { [mealType]: removedMeal, ...rest } = selectedMeals
      setSelectedMeals(rest)
      setTotalPrice(totalPrice - price)
    } else {
      // Meal is not selected, so select it
      const updatedSelectedMeals = { ...selectedMeals, [mealType]: price }
      setSelectedMeals(updatedSelectedMeals)
      setTotalPrice(totalPrice + price)
    }
  }

  const calculateTotalPrice = () => {
    let mealsTotal = 0
    for (const mealType in selectedMeals) {
      mealsTotal += Number(selectedMeals[mealType]) * numberOfNights
    }
    setTotalPrice(place.price * numberOfNights + mealsTotal)
  }

  const today = new Date().toISOString().split('T')[0]

  const validatePhoneNumber = () => {
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      //   setPhoneError('Please enter a valid 10-digit phone number');
      //   return false;
      // } else {
      //   setPhoneError('');
      //   return true;

      dispatch(
        showSnakbar({
          message: `Please Enter valid 10-digit phone number!`,
          open: true,
          type: 'error'
        })
      )
      return false
    } else {
      return true
    }
  };

  const handleReservation = () => {
    const isPhoneValid = validatePhoneNumber();
    // if (isPhoneValid) {
    //   handlePayment();
    // }

    if (user === null) {
      dispatch(
        showSnakbar({
          message: `Please Login First!!`,
          open: true,
          type: 'error'
        })
      )
      navigate('/login')
    }

    else if (!checkIn || !checkOut) {
      dispatch(
        showSnakbar({
          message: `Please select check-in and check-out dates`,
          open: true,
          type: 'error'
        })
      )
    }

    else if (checkIn >= checkOut) {
      dispatch(
        showSnakbar({
          message: `Check-out date must be greater than check-in date`,
          open: true,
          type: 'error'
        })
      )
    }

    else if (fullName === '' || phone === '') {
      dispatch(
        showSnakbar({
          message: `Please Enter your name and mobile numebr`,
          open: true,
          type: 'error'
        })
      )
    }

    else if (!isPhoneValid) {
      dispatch(
        showSnakbar({
          message: `Please Enter valid mobile number`,
          open: true,
          type: 'error'
        })
      )
    }

    else {
      handlePayment()
    }
  };

  if (redirect) {
    return <Navigate to='/account/bookings' />
  }

  if (loading) {
    return 'Loading...'
  }

  return (
    <div className='w-full sm:w-8/12 lg:w-6/12 xl:w-4/12 mt-16 rounded-2xl border border-gray-200 p-2'>
      <h2 className='font-bold'>₹{place.price} per night</h2>
      <div className='mt-4 rounded-lg'>
        <div className='pb-2'>
          <label
            style={{ borderRight: '1px solid black' }}
            htmlFor='dateInput1'
            className='block cursor-pointer grid grid-cols-2'
          >
            <span className='text-sm'>CHECK-IN : </span>
            <input
              type='date'
              id='dateInput1'
              min={today}
              value={checkIn}
              onChange={e => {
                const selectedDate = e.target.value
                if (selectedDate >= today) {
                  setCheckIn(selectedDate)
                }
              }}
            />
          </label>
          <label
            className='block cursor-pointer grid grid-cols-2'
            htmlFor='dateInput2'
          >
            <span className='text-sm'>CHECK-OUT : </span>
            <input
              type='date'
              id='dateInput2'
              min={checkIn || today}
              value={checkOut}
              onChange={e => {
                const selectedDate = e.target.value
                if (selectedDate >= checkIn) {
                  setCheckOut(selectedDate)
                }
              }}
            />
          </label>
        </div>

        <div className='w-full'>
          <span className='text-sm'>GUESTS</span>
          <input
            type='number'
            value={numberOfGuests}
            onChange={e => setNumberOfGuests(e.target.value)}
          />
        </div>
        {checkIn && checkOut && user && (
          <>
            <div className='w-full'>
              <span className='text-sm'>Full Name</span>
              <input
                type='text'
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </div>

            <div className='w-full'>
              <span className='text-sm'>Phone Number</span>
              <input
                type='number'
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
              {phoneError && <p className="text-red-500">{phoneError}</p>}
            </div>
          </>
        )}

        <div>
          <div className='text-sm mt-2.5 p-1'>Select Meal Type: </div>
          <label className='mr-1.5 cursor-pointer'>
            <input
              type='radio'
              name='mealType'
              value='veg'
              checked={mealType === 'veg'}
              onChange={() => setMealType('veg')}
              className='mt-2 ml-2 mr-1'
            />
            Veg
          </label>
          <label className='ml-1.5 cursor-pointer'>
            <input
              type='radio'
              name='mealType'
              value='nonVeg'
              checked={mealType === 'nonVeg'}
              onChange={() => setMealType('nonVeg')}
              className='ml-2 mr-1'
            />
            Non-Veg
          </label>
        </div>

        <h4 className='text font-semibold mt-2'>Meals Offered</h4>
        <div className='flex flex-wrap gap-4 mt-2'>
          {place.meals.mealType.map((meal, index) => (
            <div key={index} className='flex gap-2 items-center'>
              <input
                type='checkbox'
                onChange={() =>
                  handleMealSelect(meal, place.meals.mealPrice[index])
                }
              />
              <span>{meal}</span>
              <span>₹{place.meals.mealPrice[index]}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className='bg-primary w-full mt-4 px-3 py-2 rounded-lg text-white'
        onClick={handleReservation}
      >
        Reserve
      </button>
      <div className='flex justify-between my-5'>
        <u>Total:</u>
        <span>₹{totalPrice}</span>
      </div>
    </div>
  )
}

export default Reserve
