import React from 'react'
import Job from './Job';



const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const Browse = () => {
    
    return (
        <div>
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({randomJobs.length}) </h1>
                <div className='grid grid-cols-4 gap-4'>
                    {
                        randomJobs.map((Item,idx) => {
                            return (
                                <Job />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse