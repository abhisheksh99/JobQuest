import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = () => {
  return (
    <div className="grid gap-6 p-4">
      <div className="p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        {/* Company Section */}
        <div className="space-y-1 mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Company Name</h2>
          <p className="text-sm text-gray-500 flex items-center">
            <span className="inline-block">🌍</span>
            <span className="ml-1">India</span>
          </p>
        </div>

        {/* Job Details Section */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">Frontend Developer</h1>
          <p className="text-base text-gray-600 leading-relaxed">
            A Frontend Developer is responsible for designing and implementing the
            user interface and user experience of a website or web application,
            ensuring it is visually appealing and responsive.
          </p>
        </div>

        {/* Badges Section */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Badge 
            className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold px-4 py-2 rounded-full"
            variant="ghost"
          >
            8 Positions
          </Badge>
          
          <Badge 
            className="bg-red-50 text-red-600 hover:bg-red-100 font-semibold px-4 py-2 rounded-full"
            variant="ghost"
          >
            Software Developer
          </Badge>
          
          <Badge 
            className="bg-purple-50 text-purple-600 hover:bg-purple-100 font-semibold px-4 py-2 rounded-full"
            variant="ghost"
          >
            56LPA
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;