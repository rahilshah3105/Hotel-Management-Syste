const express = require('express')
const {
  getReviewById,
  postReview,
  getBookingDetails,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  uploadLinkPhoto,
  addPlace,
  getPlaces,
  getSinglePlace,
  updatePlace,
  allPlaces,
  bookPlace,
  cancelBooking,
  Contact,
  getBookingsByID
} = require('../controllers/UserController')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.get('/logout', logoutUser)
router.post('/uploads', uploadLinkPhoto)
router.post('/places', addPlace)
router.put('/places', updatePlace)
router.get('/places', getPlaces)
router.post('/places/id', getSinglePlace)
router.get('/allPlaces', allPlaces)
router.post('/bookings', bookPlace)
router.delete('/bookings/:id', cancelBooking)
router.get('/bookings', getBookingsByID)
router.get('/bookings/detail', getBookingDetails)
router.post('/bookings/:id/reviews', postReview)
router.get('/bookings/:id/reviews', getReviewById)
router.post('/contact', Contact)


module.exports = router
