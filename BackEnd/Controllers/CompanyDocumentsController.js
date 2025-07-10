const Document = require("../Models/Company/document");
const wrapAsync = require("../utils/wrapAsync");
const path = require("path");


// Get Documents
const getDocuments = wrapAsync(async (req, res) => {
  console.log("🚀 Getting Documents...");

  const { companyId } = req.query;

  const documents = await Document.find({ companyId: companyId });

  console.log("🚀 Documents found successfully!");
  res
    .status(200)
    .json({ message: "Documents found successfully!", success: true, documents });
});

// Add Document
const addDocument = wrapAsync(async (req, res) => {
  console.log("🚀 Adding Document...");

  const { name, category, author, companyId } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Determine file type and size (for demo purposes, file size is calculated in MB)
    const fileType = file.mimetype.split('/')[1].toUpperCase();
    const fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";

    const newDocument = new Document({
        name,
        category,
        type: fileType,
        size: fileSize,
        date: new Date(),
        author, // Pass "Current User" or actual author info from the frontend
        starred: false,
        views: 0,
        filePath: file.path,
        companyId: companyId,
      });

  const savedDocument = await newDocument.save();

  console.log("🚀 Document added successfully!");

  res
    .status(201)
    .json({ message: "Document added successfully!", success: true, document: savedDocument });
});

// Update Document
const updateDocument = wrapAsync(async (req, res) => {
    try {
        console.log("🚀 Updating Document...");
        const updatedDoc = await Document.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!updatedDoc) {
          return res.status(404).json({ message: "Document not found" });
        }
        console.log("🚀 Document updated successfully!");
        res.status(200).json({ message: "Document updated successfully!", success: true, document: updatedDoc });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}
);

// Delete Document
const deleteDocument = wrapAsync(async (req, res) => {
  console.log("🚀 Deleting Document...");

  const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) {
        console.log("❌ Document not found!");
      return res.status(404).json({ message: "Document not found" });
    }

  console.log("🚀 Document deleted successfully!");

  res
    .status(200)
    .json({ message: "Document deleted successfully!", success: true });
});

// Download Document
const downloadDocument = wrapAsync(async (req, res) => {
  console.log("🚀 Downloading Document...");

  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }
    // Increase view count if needed
    doc.views += 1;
    await doc.save();
    console.log("🚀 Document downloaded successfully");
    res.download(path.resolve(doc.filePath), doc.name);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}
);

module.exports = { getDocuments, addDocument, updateDocument, deleteDocument, downloadDocument };