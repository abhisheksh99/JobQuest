import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

// Function to allow a user to apply for a job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id; // Get the logged-in user's ID
        const jobId = req.params.id; // Get the job ID from request parameters

        if (!jobId) {
            // Check if the job ID is provided
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        // Check if the user has already applied for this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        // Add the application to the job's applications array
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

// Function to get all jobs applied by a user
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id; // Get the logged-in user's ID
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } }
                }
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found.",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

// Function to get all applicants for a specific job (Admin only)
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id; // Get the job ID from request parameters
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

// Function to update the status of an application
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body; // Get the new status from request body
        const applicationId = req.params.id; // Get the application ID from request parameters

        if (!status) {
            // Check if the status is provided
            return res.status(400).json({
                message: "Status is required.",
                success: false
            });
        }

        // Find the application by its ID
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        // Update the application's status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error" });
    }
};
