import sql from "../config/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const craetions =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.json({ success: true, craetions });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getPublishCreations = async (req, res) => {
  try {
    const craetions =
      await sql`SELECT * FROM creations WHERE publish = true ORDER BY  created_at DESC`;

    res.json({ success: true, craetions });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth;

    const { id } = req.body;

    const [creation] = await sql`SELECT * FROM WHERE id = ${id}`;

    if (!creation) {
      return res.json({ success: false, message: " creation Not found" });
    }

    const currentLikes = creation.likes;

    const userIdstr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdstr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdstr);

      message = "Creation unliked";
    } else {
      updatedLikes = [...currentLikes, userIdstr];
      message: "Creation Liked";
    }

    const formattedArray = `(${updatedLikes.join(",")})`;

    await sql`UPDATE creations SET likes = ${formattedArray} ::text[] WHERE id =${id}`;

    res.json({ success: true, message });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
