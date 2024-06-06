import axios from 'axios'
import { differenceInDays } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { showSnakbar } from '../store/slices/snakbar';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const BookingPage = () => {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([])
  const [reviewBoxes, setReviewBoxes] = useState({})
  const [reviewTexts, setReviewTexts] = useState({})
  const getBookings = () => {
    axios
      .get('/bookings')
      .then(response => {
        // console.log(response.data)
        setBookings(response.data)

        const initialReviewBoxesState = {}
        const initialReviewTextsState = {}
        response.data.forEach((_, index) => {
          initialReviewBoxesState[index] = false
          initialReviewTextsState[index] = ''
        })
        setReviewBoxes(initialReviewBoxesState)
      })
      .catch(err => console.error(err))
  }
  useEffect(() => {
    getBookings()
  }, [])
  const toggleReviewBox = index => {
    setReviewBoxes(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }))
  }
  const submitReview = (index, id) => {
    const reviewData = {
      text: reviewTexts[index]
    }

    console.log(
      `Submitting review for booking at index ${id}:`,
      reviewData.text
    )

    axios
      .post(`/bookings/${id}/reviews`, reviewData)
      .then(response => {
        alert('Review submitted successfully, Thank you for give a review', response.data)
        getBookings()
      })
      .catch(error => {
        console.error('Error submitting review:', error)
      })
  }

  const handleReviewTextChange = (index, newText) => {
    setReviewTexts(prevState => ({
      ...prevState,
      [index]: newText
    }))
  }
  const cancelBooking = (id) => {
    console.log(id)
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (confirmCancel) {
      axios
        .delete(`/bookings/${id}`)
        .then(response => {
          if (response.status === 404) {
            console.log(response)
            dispatch(
              showSnakbar({
                message: response.data.message,
                open: true,
                type: 'error',
              })
            );
          } else {
            console.log(response)
            dispatch(
              showSnakbar({
                message: "Booking Cancel Successfully",
                open: true,
                type: 'success',
              })
            );
            getBookings()
          }
        })
        .catch(error => {
          console.log(error)
          dispatch(
            showSnakbar({
              message: `Internal Server Error!`,
              open: true,
              type: 'error',
            })
          );
          console.error('Error cancelling booking:', error)
        })

    }
  };

  const downloadPdf = async (id) => {
    try {
      const response = await axios.get(`/bookings/${id}`);

      const capture = document.getElementById('capture');
      const canvas = await html2canvas(capture);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'px', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
      pdf.save('Booking.pdf');
      dispatch(
        showSnakbar({
          message: "PDF Downloaded Successfully",
          open: true,
          type: 'success',
        })
      );
    } catch (error) {
      console.error('Error downloading PDF:', error);
      dispatch(
        showSnakbar({
          message: "PDF not downloaded!",
          open: true,
          type: 'error',
        })
      );
    }
  };

  return (
    <div className='container'>
      <div className='row row-cols-12 row-cols-sm-2 g-4'>
        {bookings.map((booking, index) => (
          <div className='col-12' key={index}>
            <div className='border p-3 cursor-pointer'>
              <Link to={`/singleplace/${booking.place._id}`} className='text-decoration-none text-dark'>
                <div className='col-12'>
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
                        Razorpay Id: {booking.razorpay_payment_id}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                className='btn btn-danger px-6 py-2 text-white rounded mt-2'
                onClick={() => cancelBooking(booking._id)}
              >
                Cancel Booking
              </button>{' '}
              <button
                className='btn btn-primary px-6 py-2 text-white rounded mt-2'
                onClick={e => {
                  e.preventDefault()
                  toggleReviewBox(index)
                }}
              >
                Write a Review
              </button>{' '}
              {reviewBoxes[index] && (
                <div className='mt-3'>
                  <textarea
                    rows='4'
                    cols='50'
                    placeholder='Write your review here...'
                    className='form-control'
                    value={reviewTexts[index]} // Set value to review text
                    onChange={e =>
                      handleReviewTextChange(index, e.target.value)
                    }
                  ></textarea>
                  <button
                    className='btn btn-success mt-2'
                    onClick={() => submitReview(index, booking.place._id)}
                  >
                    Submit Review
                  </button>
                </div>
              )}
              <button
                className='btn btn-success px-6 py-2 text-white rounded mt-2'
                onClick={() => downloadPdf(booking._id)}
                id='capture'
              >
                Download Reciept
              </button>{' '}
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default BookingPage
