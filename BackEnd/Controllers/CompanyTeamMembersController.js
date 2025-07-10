const CompanyTeamMember = require('../Models/Company/teamMember');
const wrapAsync = require('../utils/wrapAsync');

// Get Team Members
const getTeamMembers = wrapAsync(async (req, res) => {
  console.log('🚀 Getting Team Members...');

  const { companyId } = req.query;

  const teamMembers = await CompanyTeamMember.find({ companyId: companyId });

  console.log('🚀 Team Members found successfully!');

  res
    .status(200)
    .json({ message: 'Team Members found successfully!', success: true, teamMembers });
});

// Add Team Member
const addTeamMember = wrapAsync(async (req, res) => {
  console.log('🚀 Adding Team Member...');

  const { companyId, name, role, department, email, phone, location } = req.body;

  if (!companyId || !name || !role || !department || !email || !phone || !location) {
    console.log('❌ Missing required fields!');
    return res
      .status(400)
      .json({ message: 'Missing required fields!', success: false });
  }


  const newTeamMember = new CompanyTeamMember({
    companyId,
    name,
    role,
    department,
    email,
    phone,
    location,
  });

  const savedTeamMember = await newTeamMember.save();

  console.log('🚀 Team Member added successfully!');

  res
    .status(201)
    .json({ message: 'Team Member added successfully!', success: true, teamMember: savedTeamMember });
});

// Update Team Member
const updateTeamMember = wrapAsync(async (req, res) => {
  console.log('🚀 Updating Team Member...');

  const { id } = req.params;

  const updatedTeamMember = await CompanyTeamMember.findByIdAndUpdate(id, req.body, { new: true });

  console.log('🚀 Team Member updated successfully!');

  res
    .status(200)
    .json({ message: 'Team Member updated successfully!', success: true, teamMember: updatedTeamMember });
});

// Delete Team Member
const deleteTeamMember = wrapAsync(async (req, res) => {
  console.log('🚀 Deleting Team Member...');

  const { id } = req.params;

  await CompanyTeamMember.findByIdAndDelete(id);

  console.log('🚀 Team Member deleted successfully!');

  res
    .status(200)
    .json({ message: 'Team Member deleted successfully!', success: true });
});


module.exports = {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
};