const UserModal = require("../Models/User");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

// POST Profile
const postProfile = wrapAsync(async (req, res) => {
  console.log("Processing Profile Post...");

  // Initialize an empty object for the data
  const data = {};

  // Dynamically add fields to the data object if they exist in req.body
  if (req.body.userId) data.userId = req.body.userId;
  if (req.body.profileImage) data.profilePhoto = req.body.profileImage;
  if (req.body.location) data.profileBanner = { location: req.body.location };
  if (req.body.description)
    data.profileBanner = {
      ...data.profileBanner,
      description: req.body.description,
    };

  // You can continue adding more fields dynamically as needed
  if (req.body.firstName) data.firstName = req.body.firstName;
  if (req.body.lastName) data.lastName = req.body.lastName;
  if (req.body.dob) data.dob = req.body.dob;
  if (req.body.email) data.email = req.body.email;
  if (req.body.phoneNumber) data.phoneNumber = req.body.phoneNumber;
  if (req.body.password) data.password = req.body.password;
  if (req.body.gender) data.gender = req.body.gender;
  if (req.body.country) data.country = req.body.country;
  if (req.body.about) data.about = req.body.about;

  // Parse experiences if it's a stringified JSON
  if (req.body.experiences) {
    try {
      const experiences = JSON.parse(req.body.experiences); // Parse string to array
      data.workExperience = experiences.map((exp) => ({
        title: exp.title,
        company: exp.company,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description,
        jobType: exp.jobType,
      }));
    } catch (error) {
      console.error("Error parsing experiences:", error);
      return res.status(400).json({ error: "Invalid experiences format" });
    }
  }

  // Only map skills if they exist
  if (req.body.skills) {
    try {
      const parsedSkills = JSON.parse(req.body.skills);

      // Initialize data.skills with the same shape as your schema
      data.skills = {
        technicalKnowledge: {
          language: [],
          framework: [],
        },
        coreKnowledge: [],
        languages: [],
      };

      // Handle technicalKnowledge if it's an array
      if (Array.isArray(parsedSkills.technicalKnowledge)) {
        parsedSkills.technicalKnowledge.forEach((item) => {
          // Each 'item' might look like: { language: "xxxx", framework: "yyyy" }
          if (item.language) {
            // Push into the language array
            data.skills.technicalKnowledge.language.push(item.language);
          }
          if (item.framework) {
            // Push into the framework array
            data.skills.technicalKnowledge.framework.push(item.framework);
          }
        });
      }

      // Handle coreKnowledge if it's an array of strings
      if (Array.isArray(parsedSkills.coreKnowledge)) {
        data.skills.coreKnowledge = parsedSkills.coreKnowledge;
      }

      // Handle languages if it's an array of objects
      if (Array.isArray(parsedSkills.languages)) {
        // Each object: { name: "xxxx", level: "xxxx" }
        data.skills.languages = parsedSkills.languages;
      }
    } catch (error) {
      console.error("Error parsing skills:", error);
      return res.status(400).json({ error: "Invalid skills format" });
    }
  }

  // Only map education if it exists
  if (req.body.education) {
    const educationArray = JSON.parse(req.body.education);
    data.education = educationArray.map((edu) => ({
      name: edu.name,
      stream: edu.stream,
      endDate: edu.endDate,
    }));
  }

  // Only map certificates if they exist
  if (req.body.certificates) {
    const certificateArray = JSON.parse(req.body.certificates);
    data.certificate = certificateArray.map((cert) => ({
      name: cert.courseName,
      issuedBy: cert.courseFrom,
      courseType: cert.type,
      duration: cert.duration,
      description: cert.description,
    }));
  }

  console.log("Data:", data);

  // Find and update the user if they exist, otherwise create a new user
  let user;
  user = await UserModal.findOne({ _id: data.userId });

  if (user) {
    await UserModal.findOneAndUpdate({ _id: data.userId }, data);
  } else {
    user = await UserModal.create(data);
  }

  res.status(201).json(user);
});

const getProfile = wrapAsync(async (req, res) => {
  console.log("Processing Profile Get...");
  const { _id } = req.query;
  const user = await UserModal.findOne({ _id: _id });
  res.status(200).json(user);
});

const getAllProfiles = wrapAsync(async (req, res) => {
  console.log("Processing Profile Get All...");
  const users = await UserModal.find();
  res.status(200).json(users);
});

// Get Friend Status

const getFriendStatus = wrapAsync(async (req, res) => {
  console.log("Processing Friend Status Get...");
  const { currentUserId, friendId } = req.query;
  const user = await UserModal.findById(currentUserId);
  const friend = await UserModal.findById(friendId);

  if (!user || !friend) {
    return res.status(404).json({ message: "User or friend not found" });
  }

  const isFriend = user.friends.some(
    (friend) => friend.userId.toString() === friendId
  );
  const isPending = user.pendingFriends.some(
    (pending) => pending.userId.toString() === friendId
  );

  let status = "none";
  if (isFriend) {
    status = "connected";
  } else if (isPending) {
    status = "pending";
  }

  res.status(200).json({ status });
});

// Get Friend Requests (only status "requested")
const getFriendRequests = wrapAsync(async (req, res) => {
  console.log("Processing Friend Requests Get...");
  const { userId } = req.query;

  const user = await UserModal.findById(userId).populate(
    "pendingFriends.userId",
    "firstName lastName profilePhoto workExperience"
  );
  console.log("User:", user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Filter to only those with status "requested" (incoming requests)
  const friendRequests = user.pendingFriends
    .filter((request) => request.status === "requested")
    .map((request) => {
      const u = request.userId;
      return {
        _id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        profileImage: u.profilePhoto || "",
        company: u.workExperience?.[0]?.company || "",
        title: u.workExperience?.[0]?.title || "",
      };
    });

  console.log("Friend Requests:", friendRequests);
  res.status(200).json(friendRequests);
});


// Add Friend

const addFriend = wrapAsync(async (req, res) => {
  console.log("Processing Add Friend...");
  const { currentUserId, friendId } = req.body;
  const user = await UserModal.findById(currentUserId);
  const friend = await UserModal.findById(friendId);

  if (!user || !friend) {
    console.log("User or friend not found");
    return res.status(404).json({ message: "User or friend not found" });
  }

  // Check if already friends or pending

  const isFriend = user.friends.some(
    (friend) => friend.userId.toString() === friendId
  );
  const isPending = user.pendingFriends.some(
    (pending) => pending.userId.toString() === friendId
  );

  if (isFriend) {
    console.log("Already friends");
    return res.status(400).json({ message: "Already friends" });
  }

  if (isPending) {
    console.log("Friend request already sent");
    return res.status(400).json({ message: "Friend request already sent" });
  }

  // Add to pending friends
  user.pendingFriends.push({
    userId: friendId,
    status: "pending",
    connectionDate: new Date(),
  });
  friend.pendingFriends.push({
    userId: currentUserId,
    status: "requested",
    connectionDate: new Date(),
  });
  await user.save();
  await friend.save();
  console.log("Friend request sent");
  res.status(200).json({ message: "Friend request sent" });
});

// Accept Friend

const acceptFriend = wrapAsync(async (req, res) => {
  console.log("Processing Accept Friend...");
  const { currentUserId, friendId } = req.body;
  const user = await UserModal.findById(currentUserId);
  const friend = await UserModal.findById(friendId);


  if (!user || !friend) {
    console.log("User or friend not found");
    return res.status(404).json({ message: "User or friend not found" });
  }

  // Check if already friends or not pending
  const isFriend = user.friends.some(
    (friend) => friend.userId.toString() === friendId
  );
  const isPending = user.pendingFriends.some(
    (pending) => pending.userId.toString() === friendId
  );

  if (isFriend) {
    console.log("Already friends");
    return res.status(400).json({ message: "Already friends" });
  }

  if (!isPending) {
    console.log("No pending friend request");
    return res.status(400).json({ message: "No pending friend request" });
  }

  // Remove from pending friends and add to friends
  user.pendingFriends = user.pendingFriends.filter(
    (pending) => pending.userId.toString() !== friendId
  );
  user.friends.push({
    userId: friendId,
    status: "connected",
    connectionDate: new Date(),
  });
  await user.save();
  res.status(200).json({ message: "Friend request accepted" });
});

// Reject Friend

const rejectFriend = wrapAsync(async (req, res) => {
  console.log("Processing Reject Friend...");
  const { currentUserId, friendId } = req.body;

  const user = await UserModal.findById(currentUserId);

  const friend = await UserModal.findById(friendId);
  if (!user || !friend) {
    return res.status(404).json({ message: "User or friend not found" });
  }

  // Check if already friends or not pending
  const isFriend = user.friends.some(
    (friend) => friend.userId.toString() === friendId
  );
  const isPending = user.pendingFriends.some(
    (pending) => pending.userId.toString() === friendId
  );

  if (isFriend) {
    return res.status(400).json({ message: "Already friends" });
  }

  if (!isPending) {
    return res.status(400).json({ message: "No pending friend request" });
  }

  // Remove from pending friends
  user.pendingFriends = user.pendingFriends.filter(
    (pending) => pending.userId.toString() !== friendId
  );
  friend.pendingFriends = friend.pendingFriends.filter(
    (pending) => pending.userId.toString() !== currentUserId
  );
  await user.save();
  await friend.save();
  console.log("Friend request rejected");
  res.status(200).json({ message: "Friend request rejected" });
});


// Get Friends

const getFriends = wrapAsync(async (req, res) => {
  console.log("Processing Get Friends...");
  const { userId } = req.query;
  const user = await UserModal.findById(userId).populate(
    "friends.userId",
    "firstName lastName profilePhoto workExperience"
  );

  if (!user) {
    console.log("User not found");
    return res.status(404).json({ message: "User not found" });
  }

  // Map friends to the desired format
  const friends = user.friends.map((friend) => {
    const u = friend.userId;
    return {
      _id: u._id,
      firstName: u.firstName,
      lastName: u.lastName,
      profileImage: u.profilePhoto || "",
      company: u.workExperience?.[0]?.company || "",
      title: u.workExperience?.[0]?.title || "",
    };
  });

  console.log("Friends:", friends);
  res.status(200).json(friends);
}
);

module.exports = {
  postProfile,
  getProfile,
  getAllProfiles,
  getFriendStatus,
  getFriendRequests,
  addFriend,
  acceptFriend,
  rejectFriend,
  getFriends, 
};
