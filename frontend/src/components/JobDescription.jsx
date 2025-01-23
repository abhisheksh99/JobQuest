import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/store/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8 border border-gray-200">
      {/* Job Title and Apply Section */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div>
          <h1 className="font-bold text-2xl text-gray-800">
            {singleJob?.title}
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <Badge className="text-blue-700 font-medium bg-blue-100 px-3 py-1 rounded-full">
              {singleJob?.positions} Positions
            </Badge>
            <Badge className="text-[#F83002] font-medium bg-red-100 px-3 py-1 rounded-full">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-medium bg-purple-100 px-3 py-1 rounded-full">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Description Section */}
      <div className="my-6">
        <h1 className="font-semibold text-xl mb-4 text-gray-800 border-b pb-2">
          Job Details
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="font-medium text-gray-600">Role:</h2>
            <p className="text-gray-800">{singleJob?.title}</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Location:</h2>
            <p className="text-gray-800">{singleJob?.location}</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Description:</h2>
            <p className="text-gray-800">{singleJob?.description}</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Experience:</h2>
            <p className="text-gray-800">{singleJob?.experience} yrs</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Salary:</h2>
            <p className="text-gray-800">{singleJob?.salary} LPA</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Total Applicants:</h2>
            <p className="text-gray-800">{singleJob?.applications?.length}</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-600">Posted Date:</h2>
            <p className="text-gray-800">
              {singleJob?.createdAt?.split("T")[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
