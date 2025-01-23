import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = ({ job }) => {
  return (
    <div className="grid gap-6 p-4">
      <div
        onClick={() => navigate(`/description/${job._id}`)}
        className="p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      >
        {/* Company Section */}
        <div className="space-y-1 mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {job?.company?.name}
          </h2>
          <p className="text-sm text-gray-500 flex items-center">
            <span className="inline-block">🌍</span>
            <span className="ml-1">USA</span>
          </p>
        </div>

        {/* Job Details Section */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">{job?.title}</h1>
          <p className="text-base text-gray-600 leading-relaxed">
            {job?.description}
          </p>
        </div>

        {/* Badges Section */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Badge
            className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold px-4 py-2 rounded-full"
            variant="ghost"
          >
            {job?.position} Positions
          </Badge>

          <Badge
            className="bg-red-50 text-red-600 hover:bg-red-100 font-semibold px-4 py-2 rounded-full"
            variant="ghost"
          >
            {job?.jobType}
          </Badge>

          <Badge
            className="bg-purple-50 text-purple-600 hover:bg-purple-100 font-semibold px-4 py-2 rounded-full"
            variant="ghost"
          >
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
