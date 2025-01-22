import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='w-screen flex flex-col items-center mx-41 gap-9'>
      <h1 
      className = 'font-extrabold text-[60px] text-center mt-16'
      >
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized itineraries at your Fingertips</h1> 
      <p>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      
      <Link to={'/create-trip'}>
        <Button>Get Started, It's Free</Button>
      </Link>
    </div>
  )
}

export default Hero