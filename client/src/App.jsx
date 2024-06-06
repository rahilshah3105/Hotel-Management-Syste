import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { UserContext, UserContextProvider } from './UserContext'
import AccountPage from './Pages/AccountPage'
import SinglePlace from './Pages/SinglePlace'
import Footer from './Components/Footer'
import AboutUs from './Components/AboutUs'
import ContactUs from './Components/ContactUs'


import AddPlace from './Components/AddPlace'
import PlacesPage from './Pages/PlacesPage'

import SnackbarComponent from './Components/Snakbar'
import { Provider } from 'react-redux'
import store from './store'
import AllBookings from './Pages/AllBookings'
import RecentBookings from './Pages/Report'
import Report from './Pages/Report'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

function App() {
  return (
    <Provider store={store}>
      <SnackbarComponent />
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/account/:subpage?' element={<AccountPage />} />
            <Route path='/account/:subpage/:action' element={<AccountPage />} />
            <Route path='/account/:subpage/:action/:id' element={<AccountPage />} />
            <Route path='/singlePlace/:id' element={<SinglePlace />} />
            <Route path='/addhotel' element={<AddPlace />} />
            <Route path='/addhotel/:id' element={<AddPlace />} />
            <Route path='/allbookings' element={<AllBookings />} />
            <Route path='/report' element={<Report />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/contactus' element={<ContactUs />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserContextProvider>
    </Provider>
  )
}

export default App
