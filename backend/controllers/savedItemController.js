const SavedItem = require("../models/SavedItem");
const List = require("../models/List");
const Shop = require("../models/Shop");
const Post = require("../models/Post");

exports.getSavedItems = async (req, res) => {
  try {
    const savedItems = await SavedItem.find({ userId: req.user }).sort({
      savedAt: -1,
    });

    const detailedSavedItems = await Promise.all(
      savedItems.map(async (saved) => {
        let itemData = null;
        if (saved.itemType === "list") {
          itemData = await List.findById(saved.itemId);
          return {
            ...saved.toObject(),
            title: itemData?.name,
            subtitle: `${itemData?.itemsCount || 0} Items • ${
              itemData?.progress || 0
            }% done`,
            image: itemData?.imageUrl,
            color: itemData?.color,
            progress: itemData?.progress,
            items: itemData?.itemsCount,
            data: itemData,
          };
        } else if (saved.itemType === "shop") {
          itemData = await Shop.findById(saved.itemId);
          return {
            ...saved.toObject(),
            title: itemData?.name,
            subtitle: `${itemData?.category || "Shop"} • ${
              itemData?.location || "Unknown location"
            }`,
            image: itemData?.imageUrl,
            data: itemData,
          };
        } else if (saved.itemType === "post") {
          itemData = await Post.findById(saved.itemId);
          return {
            ...saved.toObject(),
            title: itemData?.username,
            subtitle: itemData?.storeName,
            image: itemData?.imageUrl,
            data: itemData,
          };
        }
        return saved.toObject();
      })
    );

    res.json(detailedSavedItems.filter((item) => item.data !== null));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleSavedItem = async (req, res) => {
  const { itemId, itemType } = req.body;
  const userId = req.user;

  try {
    const existingItem = await SavedItem.findOne({ userId, itemId, itemType });

    if (existingItem) {
      await SavedItem.deleteOne({ _id: existingItem._id });
      res.json({
        success: true,
        message: "Item unsaved successfully!",
        action: "unsaved",
      });
    } else {
      const newSavedItem = new SavedItem({ userId, itemId, itemType });
      const savedItem = await newSavedItem.save();
      res.status(201).json({
        success: true,
        message: "Item saved successfully!",
        action: "saved",
        data: savedItem,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
