import React from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import useGetAllAdminJobs from '@/hooks/useGetAllJobs'

const Home = () => {
  useGetAllAdminJobs();
  return (
    <>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestJobs/>
    </>
  )
}

export default Home