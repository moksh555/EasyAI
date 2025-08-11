import sql from "../configs/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations =
      await sql` SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.json({ success: true, creation: creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getPublishedImage = async (req, res) => {
  try {
    const published =
      await sql` SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

    res.json({ success: true, creations: published });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;
    const [creation] = await sql` SELECT * FROM creations WHERE id = ${id}`;
    console.log("moksh");
    if (!creation) {
      return res.json({ success: false, message: "Creation not found" });
    }
    console.log("moksh");
    const currLikes = creation.likes;
    const userIdStr = userId.toString();
    let updatedLikes;
    let messages;
    if (currLikes.includes(userIdStr)) {
      updatedLikes = currLikes.filter((user) => user !== userIdStr);
      messages = "Creation Unliked";
    } else {
      updatedLikes = [...currLikes, userIdStr];
      messages = " Creation Liked";
    }
    const formattedArray = `{${updatedLikes.join(",")}}`;
    const published =
      await sql` UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;
    res.json({ success: true, message: messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
