import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';

function AboutUs() {
  return (
    <div className="container">
 
    <section className="my-5" id="about-us">
      <div className="container">
        <h1 className="text-center mb-5 h1">About Us</h1>
        <div className="row">
          <div className="col-md-6">
            <p>
            At Luxereserve, we're passionate about providing travelers with exceptional experiences and unforgettable stays. Our platform is designed to make hotel booking effortless and enjoyable, ensuring that every guest finds their perfect accommodation, whether it's for business or leisure.
            </p>
            <p className='pt-5'>
            Established in 2024, Hotel Booking began with a vision to revolutionize the way people book hotels. We recognized the need for a user-friendly platform that offers a wide range of accommodation options at competitive prices. Over the years, we've grown into a trusted online resource for travelers worldwide, connecting them with top-rated hotels and exceptional service.
            </p>
            <p className='pt-5'>
            At luxereserve, our mission is simple: to provide travelers with seamless booking experiences and unparalleled hospitality. We're committed to offering a diverse selection of hotels, ensuring that every guest can find the perfect place to stay, no matter their budget or preferences. With our dedication to customer satisfaction and continuous improvement, we strive to exceed expectations and make every stay memorable.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?cs=srgb&dl=pexels-pixabay-164595.jpg&fm=jpg"
              alt="Our team"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}

export default AboutUs
