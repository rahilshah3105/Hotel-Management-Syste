import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='text-center mt-6 sm:mt-8 lg:mt-10'>
      <hr className='my-2 sm:my-4 lg:my-6 border-gray-400' />
      <div className='flex justify-center items-center gap-4'>
        <a
          href='https://www.facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-600 hover:text-gray-800 transition-colors duration-300'
        >
          <FaFacebook size={24} />
        </a>
        <a
          href='https://www.twitter.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-600 hover:text-gray-800 transition-colors duration-300'
        >
          <FaTwitter size={24} />
        </a>
        <a
          href='https://www.instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-600 hover:text-gray-800 transition-colors duration-300'
        >
          <FaInstagram size={24} />
        </a>
        <a
          href='https://www.linkedin.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-600 hover:text-gray-800 transition-colors duration-300'
        >
          <FaLinkedin size={24} />
        </a>
      </div>
      <p className='text-xs sm:text-sm lg:text-base text-gray-600 mt-2'>
        Connect with us on social media for updates and promotions.
      </p>
      <p className='text-xs sm:text-sm lg:text-base text-gray-600'>
        Copyright &copy; 2024. All rights reserved.
      </p>
      <div>
        <Link to={'/aboutus'} className='text-xs sm:text-sm lg:text-base text-gray-600 mr-5'>
          <u>About Us</u>
        </Link>
        <Link to={'/contactus'} className='text-xs sm:text-sm lg:text-base text-gray-600'>
          <u>Contact Us</u>
        </Link>
      </div>
    </div>
  )
}

export default Footer
