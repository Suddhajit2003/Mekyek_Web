const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');
const FeedsModal = require('../Models/Feed');
const wrapAsync = require('../utils/wrapAsync');


// POST Feed

const postFeed = async (req, res) => {
    console.log("Processing Feed Post...");

    const data = {
        content: req.body.content,
        author: {
            firstName: req.body.firstName || "Unknown",
            lastName: req.body.lastName || "Unknown",
            profilePhoto: req.body.profilePhoto || "",
            _id: req.body.userId || "",
        },
        image: req.file ? req.file.path : null,
        postOn: req.body.postOn,
        likes: 0,
        likeBy: [],
        comments: [],
    };

    const feed = new FeedsModal(data);

    const savedFeed = await feed.save();
    console.log("✅ Feed saved successfully:", savedFeed);

    res.status(201).json({ message: 'Feed created successfully', success: true, feed: savedFeed });
}

const getFeeds = wrapAsync(async (req, res) => {
    const feeds = await FeedsModal.find({});
    res.status(200).json(feeds);
});

const likeFeed = wrapAsync(async (req, res) => {
    console.log("Processing Feed Like...");
    const { feedId, userId } = req.body;

    const feed = await FeedsModal.findById(feedId);
    if (!feed) {
        console.error("❌ Feed not found");
        return res.status(404).json({ message: "Feed not found", success: false });
    }

    if (feed.likeBy.includes(userId)) {
        feed.likes -= 1;
        feed.likeBy = feed.likeBy.filter((id) => 
            id.toString() !== userId.toString()
        );
        const updatedFeed = await feed.save();
        console.log("✅ Feed unliked successfully:", updatedFeed);

        res.status(200).json({ message: "Feed unliked successfully", success: true, feed: updatedFeed });
        return;
    }

    feed.likes += 1;
    feed.likeBy.push(userId);

    const updatedFeed = await feed.save();
    console.log("✅ Feed liked successfully:", updatedFeed);

    res.status(200).json({ message: "Feed liked successfully", success: true, feed: updatedFeed });
});

const commentPostFeed = wrapAsync(async (req, res) => {
    console.log("Processing Feed Comment...");
    const { feedId, userId, comment, userName } = req.body;

    const feed = await FeedsModal.findById(feedId);
    if (!feed) {
        console.error("❌ Feed not found");
        return res.status(404).json({ message: "Feed not found", success: false });
    }

    feed.comments.push({
        userId,
        comment,
        userName,
        createdAt: new Date(),
    });

    const updatedFeed = await feed.save();
    console.log("✅ Feed commented successfully:", updatedFeed);

    res.status(200).json({ message: "Feed commented successfully", success: true, feed: updatedFeed });
});

const getComments = wrapAsync(async (req, res) => {
    const { feedId } = req.query;

    const feed = await FeedsModal.findById(feedId);
    if (!feed) {
        console.error("❌ Feed not found");
        return res.status(404).json({ message: "Feed not found", success: false });
    }

    res.status(200).json({ comments: feed.comments });
});

module.exports = { postFeed, getFeeds, likeFeed, commentPostFeed, getComments };