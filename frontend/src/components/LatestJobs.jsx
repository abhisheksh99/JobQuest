import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";



const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[#6A38C2] text-center">Latest & Top </span>Job
          Openings
        </div>
      </h1>
      <div className="grid grid-cols-4 gap-4 my-5 items-center justify-items-center">
        {
            allJobs.length <= 0 ? <span>No Job Available</span> :  allJobs.slice(0, 8).map((job) => (
              <div key={job._id} job={job} className="flex justify-center items-center">
                <LatestJobCards />
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default LatestJobs;
