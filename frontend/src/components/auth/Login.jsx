import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import axios from "axios";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

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
        </div>

        <Button type="submit" className="w-full my-4">
          Login
        </Button>
        <div className="w-full flex justify-center">
          <span className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
