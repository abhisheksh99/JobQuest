import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if(response.data.success){
        toast.success(res.data.message);
        navigate("/login");

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5 text-center">Signup</h1>
        <div className="my-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullName"
            placeholder="Enter your Full name"
            value={input.fullName}
            onChange={changeEventHandler}
          />
        </div>
        <div className="my-2">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your Email Address"
            value={input.email}
            onChange={changeEventHandler}
          />
        </div>
        <div className="my-2">
          <Label>Phone Number</Label>
          <Input
            type="text"
            name="phoneNumber"
            placeholder="Enter your Phone Number"
            value={input.phoneNumber}
            onChange={changeEventHandler}
          />
        </div>
        <div className="my-2">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={input.password}
            onChange={changeEventHandler}
          />
        </div>
        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                className="cursor-pointer"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              <Label>Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                className="cursor-pointer"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={changeFileHandler}
            />
          </div>
        </div>
        <Button type="submit" className="w-full my-4">
          Signup
        </Button>
        <div className="w-full flex justify-center">
          <span className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;