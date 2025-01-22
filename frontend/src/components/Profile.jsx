import React from "react";
import { AvatarImage, Avatar } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";

const Profile = () => {
  const skills = ["Html", "Css", "Javascript", "Reactjs"];
  const isResume = true;

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
              alt="profile"
            />
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">FullName</h1>
            <p>Add your bio here</p>
          </div>
        </div>

        <Button className="text-right" variant="outline">
          <Pen />
        </Button>
      </div>

      <div className="my-5">
        {/* Contact Info */}
        <div className="flex items-center gap-3 my-2">
          <Mail />
          <span>ahisek@gmail.com</span>
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact />
          <span>ahisek@gmail.com</span>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h1 className="mb-3">Skills</h1>
          <div className="flex items-center gap-2">
            {skills.length > 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>

          {/* Resume Section */}
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
            <Label className="text-md font-bold">
              Resume:
              {isResume ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href=""
                  className="text-blue-500 w-full hover:underline cursor-pointer ml-2"
                >
                  Download Resume
                </a>
              ) : (
                <span className="ml-2">NA</span>
              )}
            </Label>
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl mt-8 p-6">
        <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
    </div>
  );
};

export default Profile;
