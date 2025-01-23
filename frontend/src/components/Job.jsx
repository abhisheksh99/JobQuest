import React from "react";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="p-4 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500">
          {" "}
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full h-8 w-8" size="icon">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={job?.company?.logo} alt="Company logo" />
        </Avatar>
        <div>
          <h1 className="font-medium text-base">{job?.company?.name}</h1>
          <p className="text-xs text-gray-500">USA</p>
        </div>
      </div>

      <h2 className="font-bold text-base mb-1">{job?.title}</h2>
      <p className="text-xs text-gray-600 mb-2 line-clamp-3">
        {job?.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-2">
        <Badge className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded-full">
          {job?.position} Positions
        </Badge>
        <Badge className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-2 py-1 rounded-full">
          {job?.jobType}
        </Badge>
        <Badge className="text-xs bg-purple-50 text-purple-600 hover:bg-purple-100 px-2 py-1 rounded-full">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center  justify-between gap-2 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="text-xs py-1 h-8"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-xs py-1 h-8">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
