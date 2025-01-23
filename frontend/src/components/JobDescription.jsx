import React from "react";
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const JobDescription = () => {
  const isApplied = true;

  return (
    <div className="max-w-7xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8 border border-gray-200">
      {/* Job Title and Apply Section */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div>
          <h1 className="font-bold text-2xl text-gray-800">3001title</h1>
          <div className="flex items-center gap-3 mt-3">
            <Badge className="text-blue-700 font-medium bg-blue-100 px-3 py-1 rounded-full">
              3001 postion Positions
            </Badge>
            <Badge className="text-[#F83002] font-medium bg-red-100 px-3 py-1 rounded-full">
              3001jobType
            </Badge>
            <Badge className="text-[#7209b7] font-medium bg-purple-100 px-3 py-1 rounded-full">
              3001 LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg px-6 py-3 text-white font-bold ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-500"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Description Section */}
      <div className="my-6">
        <h1 className="font-semibold text-xl mb-4 text-gray-800 border-b pb-2">Job Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="font-medium text-gray-600">Role:</h2>
            <p className="text-gray-800">3001title</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Location:</h2>
            <p className="text-gray-800">3001location</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Description:</h2>
            <p className="text-gray-800">3001description</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Experience:</h2>
            <p className="text-gray-800">3001experience yrs</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Salary:</h2>
            <p className="text-gray-800">3001salaryLPA</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Total Applicants:</h2>
            <p className="text-gray-800">3001applications?.length</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Posted Date:</h2>
            <p className="text-gray-800">3001</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
