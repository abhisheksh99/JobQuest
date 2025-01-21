import Company from "../models/companyModel.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    // Check if the company name is provided
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    // Check if a company with the same name already exists
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register the same company.",
        success: false,
      });
    }

    // Create a new company record
    company = await Company.create({
      name: companyName,
      userId: req.id, // Associate company with the logged-in user
    });

    // Return success response
    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);

    // Return server error response
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; 

    // Fetch all companies associated with the user
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }

    // Return success response with the list of companies
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);

    // Return server error response
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Get a specific company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; 

    // Find the company by ID
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // Return success response with company details
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);

    // Return server error response
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body; 
    const file = req.file; 

    // Implement Cloudinary logic here for file upload if needed

    // Create an object with updated data
    const updateData = { name, description, website, location };

    // Find the company by ID and update its details
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the updated document
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // Return success response
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);

    // Return server error response
    res.status(500).json({ message: "Internal Server error" });
  }
};
