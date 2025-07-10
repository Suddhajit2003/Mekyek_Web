const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinaryConfig");

const { registerCompany, applyForJob, getCompanyByUserId, getCompany } = require("../Controllers/CompanyController");
const { companyValidation, jobApplyValidation } = require("../Middlewares/CompanyValidation");
const { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = require("../Controllers/CompanyTeamMembersController");
const { getDocuments, addDocument, updateDocument, deleteDocument, downloadDocument } = require("../Controllers/CompanyDocumentsController");

const router = express.Router();

// Storage for company logos: restrict to image formats
const companyLogoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads/companyLogos", // separate folder for logos
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Storage for resumes: allow any file format (or you can specify allowed formats if needed)
const resumeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads/resumes", // separate folder for resumes
    // Note: By omitting 'allowed_formats', any file type is accepted.
    // Alternatively, you could restrict to a set like:
    // allowed_formats: ["pdf", "doc", "docx"]
  },
});

// Storage for company documents: allow any file format (or you can specify allowed formats if needed)
const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads/documents", // separate folder for documents
  },
});

const uploadLogo = multer({ storage: companyLogoStorage });
const uploadResume = multer({ storage: resumeStorage });
const uploadDocument = multer({ storage: documentStorage });

// ✅ Route with Improved Error Handling for Company Registration
router.post(
  "/register",
  (req, res, next) => {
    uploadLogo.single("companyLogo")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message, success: false });
      }
      next();
    });
  },
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "No company logo file received", success: false });
    }
    next();
  },
  registerCompany
);

// Route for getting company data by owner (UserId)
router.get("/get", getCompanyByUserId);
router.get("/getCompany", getCompany);

// Route for Job Application with Resume Upload
router.post(
  "/job-apply",
  (req, res, next) => {
    console.log("Middleware: Before File Upload");
    uploadResume.single("resume")(req, res, (err) => {
      console.log("Middleware: After File Upload");
      if (err) {
        console.log("❌ Error uploading file:", err.message);
        return res.status(400).json({ message: err.message, success: false });
      }
      next();
    });
  },
  (req, res, next) => {
    console.log("Middleware: Checking File");
    if (!req.file) {
      return res.status(400).json({ message: "No resume file received", success: false });
    }
    next();
  },
  applyForJob
);

// route for company team members
router.get('/team-members', getTeamMembers);
router.post('/team-members', addTeamMember);
router.patch('/team-members/:id', updateTeamMember);
router.delete('/team-members/:id', deleteTeamMember);

// route for company documents
router.get('/documents', getDocuments);
router.post('/documents', uploadDocument.single('file'), addDocument);
router.patch('/documents/:id', updateDocument);
router.delete('/documents/:id', deleteDocument);
router.get('/documents/:id/download', downloadDocument);

module.exports = router;
