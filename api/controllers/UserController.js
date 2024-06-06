const User = require('../models/User')
const Booking = require('../models/Booking')
const Meal = require('../models/Meal')
const Review = require('../models/Review')
const bcrypt = require('bcrypt')
const path = require('path')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const imagedownload = require('image-downloader')
const Place = require('../models/Place')
const ContactUs = require('../models/Contact')

const Contact = async (req, res) => {
  console.log(req.body)
  const { name, email, number, message } = req.body
  try {
    const contact = await ContactUs.create({
      name,
      email,
      number,
      message
    })
    console.log(contact)
    return res.status(201).json(contact)
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: 'Internal Server Error Please try again later' })
  }
}

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    if (!name || !email || !password) {
      return res.status(404).json({ message: 'All fields are mandatory' })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(404).json({ message: 'User already registered' })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      password: hashPassword
    })
    return res.status(201).json(user)
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error Please try again later' })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(404).json({ message: 'All fields are mandatory' })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const token = jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '150minutes' }
      )
      res.cookie('token', token)
      res.status(200).json(user)
    } else {
      return res.status(404).json({ message: 'Invalid username or password' })
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error Please try again later' })
  }
}

const getProfile = (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      res.json(user)
    })
  } else {
    res.json(null)
  }
  // res.send({"Authenciated":true,data:req.user})
  // res.json(user)
}

const logoutUser = (req, res) => {
  res.clearCookie('token')

  res.status(200).json({ message: 'hello' })
}

const uploadLinkPhoto = async (req, res) => {
  const { link } = req.body
  const newName = Date.now() + '.jpg'

  const dest = path.join(__dirname, '..', 'uploads', newName)
  await imagedownload.image({
    url: link,
    dest: dest
  })
  res.status(200).json({ newName })
}

const addPlace = async (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    price,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    updatedMeals
  } = req.body

  const { token } = req.cookies
  let user

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, currentUser) => {
    if (err) throw err
    user = currentUser
  })

  try {
    // Create meals and associate them with the place
    const meals = {
      mealType: updatedMeals.mealType,
      mealPrice: updatedMeals.mealPrice
    }

    const meal = await Meal.create(meals)
    // Create the place
    const place = await Place.create({
      owner: user.id,
      title,
      address,
      photos: addedPhotos,
      price,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      meals: meal._id
    })

    return res.status(201).json({ place })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}

const getPlaces = async (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, currentUser) => {
  // console.log(user.id)
    if (err) throw err
    res.json(await Place.find({ owner: currentUser.id }))
  })
}

const getSinglePlace = async (req, res) => {
  // console.log(req.body)
  const { id } = req.body

  try {
    const place = await Place.findById(id).populate('meals')

    if (!place) {
      return res.status(404).json({ error: 'Place not found' })
    }
    console.log(place)
    return res.json({ place })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}

const updatePlace = async (req, res) => {
  // console.log(req.body)
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body
  const { token } = req.cookies
  let user

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, currentUser) => {
    if (err) throw err
    user = currentUser
  })

  try {
    const place = await Place.findByIdAndUpdate(id, {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    })
    // console.log(place)
    return res.status(201).json({ place })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}

const removePlace = async (req, res) => {
  const { id } = req.body
  try {
    const place = await Place.findByIdAndDelete(id)
    return res.status(201).json({ place })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}

const allPlaces = async (req, res) => {
  res.json(await Place.find())
}

const updatePlaces = async (req, res) => {
  res.json(await Place.find())
}

const bookPlace = async (req, res) => {
  const {
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    fullName,
    phone,
    price,
    meals,
    mealType,
    razorpay_payment_id,
    status
  } = req.body

  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, currentUser) => {
    if (err) {
      return res.json('Please Login')
    }
    const bookingDoc = await Booking.create({
      place,
      userId: currentUser.id,
      checkIn,
      checkOut,
      numberOfGuests,
      fullName,
      phone,
      price,
      meals: meals,
      mealType,
      razorpay_payment_id,
      status
    })
    return res.status(201).json({ bookingDoc })
  })
}

const cancelBooking = async (req, res) => {
  try {
    // Find the booking by ID and update its status to false
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: false },
      { new: true }
    )
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    res.status(200).json({
      booking: updatedBooking
    })
  } catch (error) {
    console.error('Error cancelling booking:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
const getBookingsByID = async (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, currentUser) => {
    if (err) throw err
    const bookings = await Booking.find({
      userId: currentUser.id,
      status: true
    }).populate('place')

    res.json(bookings)
  })
}

const getBookingDetails = async (req, res) => {
  console.log(req.body)
  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, currentUser) => {
    if (err) throw err
    const bookings = await Booking.find().populate('place')
    console.log(bookings)
    res.json(bookings)
  })
}

const postReview = async (req, res) => {
  const place = req.params.id
  const review = req.body.text

  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, currentUser) => {
    if (err) throw err

    const reviewDoc = await Review.create({
      place,
      user: currentUser.id,
      review
    })
    return res.status(201).json({ reviewDoc })
  })
}

const getReviewById = async (req, res) => {
  const id = req.params.id
  const { token } = req.cookies

  const reviews = await Review.find({ place: id })
    .populate('place')
    .populate('user')

  res.json(reviews)

}
module.exports = {
  getReviewById,
  postReview,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  uploadLinkPhoto,
  addPlace,
  getPlaces,
  getSinglePlace,
  updatePlaces,
  allPlaces,
  updatePlace,
  removePlace,
  bookPlace,
  getBookingsByID,
  getBookingDetails,
  Contact,
  cancelBooking
}
