const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');
const ComunityModal = require('../Models/Comunity');
const wrapAsync = require('../utils/wrapAsync');

// POST Comunity

const createCommunity = async (req, res) => {
    console.log("Processing Comunity Post in controller...");

    if (!req.body.userId) {
        return res.status(400).json({ success: false, message: 'userId is required' });
    }

    const newComunity = new ComunityModal({
        name: req.body.name,
        description: req.body.description,
        profilePhoto: req.file.path,
        members: [
            {
                userId: req.body.userId,
                role: 'owner'
            }
        ]
    });

    try {
        const savedComunity = await newComunity.save();
        console.log("✅ Comunity saved successfully:", savedComunity);
        res.status(201).json({ success: true, community: savedComunity });
    } catch (error) {
        console.error("❌ Error saving Comunity:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

// GET Comunity

const getCommunity = async (req, res) => {
    console.log("Processing Comunity Get...");

    try {
        const comunity = await ComunityModal.find();
        res.status(200).json(comunity);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// GET Comunity by User Id

const getCommunitybyUserId = async (req, res) => {
    console.log("Processing Comunity Get by User Id...");
    const { _id } = req.query;
    try {
        const comunity = await ComunityModal.find({ 'members.userId': _id });
        res.status(200).json(comunity);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// GET Comunity by Id

const getCommunitybyId = async (req, res) => {
    console.log("Processing Comunity Get by Id...");
    const { id } = req.query;
    try {
        const comunity = await ComunityModal.findById(id);
        res.status(200).json(comunity);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// POST Comunity Post

const createPostCommunity = async (req, res) => {
    const author = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePhoto: req.body.profilePhoto,
        _id: req.body._id,
    };

    const newPost = {
        content: req.body.content,
        image: req.file ? req.file.path : null,
        date: new Date().toISOString(),
        author: author
    };

    try {
        const community = await ComunityModal.findById(req.body.communityId);
        if (!community) {
            console.error("❌ Community not found");
            return res.status(404).json({ message: "Community not found" });
        }
        community.posts.push(newPost);
        await community.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error("❌ Error creating post:", error.message);
        res.status(400).json({ message: error.message });
    }

}

// POST Like Community Post

const likeCommunityPost = async (req, res) => {
    console.log("Processing Comunity Post Like...");
    const { communityId, userId, postId } = req.body;

    try {
        const community = await ComunityModal.findOne({
            "_id": communityId
        });

        if (!community) {
            console.error("❌ Community not found");
            return res.status(404).json({ message: "Community not found" });
        }

        const post = community.posts.id(postId);

        if (post.likeBy.includes(userId)) {
            post.likes -= 1;
            post.likeBy = post.likeBy.filter((id) =>
                id.toString() !== userId.toString()
            );
        }
        else {
            post.likes += 1;
            post.likeBy.push(userId);
        }

        await community.save();
        console.log("✅ Post liked successfully:");
        res.status(200).json(post);
    }
    catch (error) {
        console.error("❌ Error liking post:", error.message);
        res.status(400).json({ message: error.message });
    }
}

// POST Comment Community Post

const commentCommunityPost = async (req, res) => {
    console.log("Processing Comunity Post Comment...");
    const { communityId, postId, userId, comment, userName } = req.body;

    try {
        const community = await ComunityModal.findOne({
            "_id": communityId
        });

        if (!community) {
            console.error("❌ Community not found");
            return res.status(404).json({ message: "Community not found" });
        }

        const post = community.posts.id(postId);

        post.comments.push({
            userId,
            comment,
            userName,
            createdAt: new Date(),
        });

        await community.save();
        res.status(200).json(post);
    }
    catch (error) {
        console.error("❌ Error commenting post:", error.message);
        res.status(400).json({ message: error.message });
    }
}

// GET Comments Community Post

const getCommentsCommunityPost = async (req, res) => {
    console.log("Processing Comunity Post Comments Get...");
    const { postId, communityId } = req.query;

    try {
        const community = await ComunityModal.findOne({
            "_id": communityId
        });

        if (!community) {
            console.error("❌ Community not found");
            return res.status(404).json({ message: "Community not found" });
        }

        const post = community.posts.id(postId);

        res.status(200).json(post.comments);
    }
    catch (error) {
        console.error("❌ Error getting comments:", error.message);
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createCommunity, getCommunity, getCommunitybyUserId, getCommunitybyId, createPostCommunity, likeCommunityPost, commentCommunityPost, getCommentsCommunityPost };