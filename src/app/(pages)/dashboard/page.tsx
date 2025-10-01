"use client"
import { Calendar22 } from '@/components/Calender22'
import React from 'react'
const Dashboard = () => {
  return (
    <>
  
    <div className='h-[90vh] flex bg-background mt-1 p-2  rounded-lg border shadow-lg overflow-y-auto'>
      Dashboard
      <Calendar22/>
    </div>
    </>
  )
}

export default Dashboard