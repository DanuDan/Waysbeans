import React, {useState, useContext} from 'react'
import NavbarLogin from '../component/navbar';
import NavbarUser from '../component/navbarUser'
import { UserContext } from '../context/userContext';
import '../assets/styles.css'

function LandingPage() {

  return (
    <div>
        
        <NavbarLogin/>
    </div>
  )
}

export default LandingPage
