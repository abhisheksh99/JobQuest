import Job from "../models/jobModel.js";

export const postJob = async (req, res) => {
  try {
    const { 
      title, description, requirements, salary, location, jobType, experience, position, companyId 
    } = req.body;

    const userId = req.id; // Extract the logged-in user ID from the request

    // Check if any required field is missing
    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    // Create a new job posting
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), // Convert requirements string to array
      salary: Number(salary), // Ensure salary is a number
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId, // Associate job with the logged-in user
    });

    // Return success response
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);

    // Return server error response
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || ""; // Get the search keyword from query parameters

    // Define a query to search for jobs based on title or description
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } }, // Case-insensitive search for title
        { description: { $regex: keyword, $options: "i" } }, // Case-insensitive search for description
      ],
    };

    // Fetch all jobs matching the query and populate the company details
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 }); // Sort jobs by creation date (newest first)

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    // Return success response with the list of jobs
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);

    // Return server error response
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id; // Get the job ID from request parameters

    // Find the job by ID and populate its applications
    const job = await Job.findById(jobId).populate({ path: "applications" });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // Return success response with the job details
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);

    // Return server error response
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; // Extract the logged-in admin's ID from the request

    // Fetch all jobs created by the admin and populate the associated company details
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    }).sort({ createdAt: -1 }); // Sort jobs by creation date (newest first)

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    // Return success response with the list of jobs
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);

    // Return server error response
    res.status(500).json({ message: "Internal Server error" });
  }
};
