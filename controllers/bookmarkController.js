const { get } = require("../app");
const Bookmark = require("../models/Bookmark");

// Get bookmarks for a guest
const getBookmarks = async (req, res) => {
  try {
    const { guest_id } = req.query;

    if (!guest_id) {
      return res.status(400).json({
        status: "error",
        message: "Guest ID is required",
      });
    }

    console.log(`Fetching bookmarks for guest: ${guest_id}`);

    // Updated query to use actual column names from your database
    const query = `
      SELECT 
        b.id,
        b.hotel_id,
        b.guest_id,
        b.created_at,
        h.id as hotel_id,
        h.name as hotel_name,
        h.address as hotel_address,
        h.city as hotel_city,
        h.country as hotel_country,
        CONCAT(h.city, ', ', h.country) as hotel_location,
        h.contact_email as hotel_email,
        h.phone_number as hotel_phone,
        h.hotel_image,
        h.price_per_night as hotel_price,
        4.5 as hotel_rating
      FROM bookmarks b
      INNER JOIN hotels h ON b.hotel_id = h.id
      WHERE b.guest_id = ?
      ORDER BY b.created_at DESC
    `;

    const bookmarks = await Bookmark.query(query, [guest_id]);

    console.log(`Found ${bookmarks.length} bookmarks for guest ${guest_id}`);

    // Transform the data to include proper fields
    const transformedBookmarks = bookmarks.map((bookmark) => ({
      id: bookmark.id,
      hotel_id: bookmark.hotel_id,
      guest_id: bookmark.guest_id,
      hotel_name: bookmark.hotel_name,
      hotel_location: bookmark.hotel_location,
      hotel_address: bookmark.hotel_address,
      hotel_city: bookmark.hotel_city,
      hotel_country: bookmark.hotel_country,
      hotel_email: bookmark.hotel_email,
      hotel_phone: bookmark.hotel_phone,
      hotel_image: bookmark.hotel_image || "assets/images/raddison.png",
      hotel_price: bookmark.hotel_price || 75000,
      hotel_rating: bookmark.hotel_rating || 4.5,
      created_at: bookmark.created_at,
      // Add fallback fields for compatibility
      name: bookmark.hotel_name,
      location: bookmark.hotel_location,
      image: bookmark.hotel_image || "assets/images/raddison.png",
      price: bookmark.hotel_price || 75000,
      rating: bookmark.hotel_rating || 4.5,
    }));

    res.json({
      status: "success",
      message: "Bookmarks fetched successfully",
      data: transformedBookmarks,
    });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch bookmarks: " + error.message,
    });
  }
};

// Add bookmark
const storeBookmark = async (req, res) => {
  try {
    const { hotel_id, guest_id } = req.body;

    if (!hotel_id || !guest_id) {
      return res.status(400).json({
        status: "error",
        message: "Hotel ID and Guest ID are required",
      });
    }

    // Check if bookmark already exists
    const existingBookmark = await Bookmark.query(
      "SELECT * FROM bookmarks WHERE hotel_id = ? AND guest_id = ?",
      [hotel_id, guest_id]
    );

    if (existingBookmark.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Hotel is already bookmarked",
      });
    }

    // Create new bookmark
    const bookmark = Bookmark.fill({ hotel_id, guest_id });
    await bookmark.insert();

    console.log(`Bookmark added: Hotel ${hotel_id} for Guest ${guest_id}`);

    res.json({
      status: "success",
      message: "Bookmark added successfully",
      data: {
        id: bookmark.id,
        hotel_id: bookmark.hotel_id,
        guest_id: bookmark.guest_id,
        created_at: bookmark.created_at,
      },
    });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add bookmark: " + error.message,
    });
  }
};

// Remove bookmark
const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Bookmark ID is required",
      });
    }

    const deleted = await Bookmark.delete(id);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Bookmark not found",
      });
    }

    console.log(`Bookmark removed: ID ${id}`);

    res.json({
      status: "success",
      message: "Bookmark removed successfully",
    });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to remove bookmark: " + error.message,
    });
  }
};

// Check if hotel is bookmarked
const checkBookmark = async (req, res) => {
  try {
    const { hotel_id, guest_id } = req.query;

    if (!hotel_id || !guest_id) {
      return res.status(400).json({
        status: "error",
        message: "Hotel ID and Guest ID are required",
      });
    }

    const bookmark = await Bookmark.query(
      "SELECT * FROM bookmarks WHERE hotel_id = ? AND guest_id = ?",
      [hotel_id, guest_id]
    );

    res.json({
      status: "success",
      message: "Bookmark status checked",
      data: {
        isBookmarked: bookmark.length > 0,
        bookmarkId: bookmark.length > 0 ? bookmark[0].id : null,
      },
    });
  } catch (error) {
    console.error("Error checking bookmark:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to check bookmark: " + error.message,
    });
  }
};

module.exports = {
  getBookmarks,
  storeBookmark,
  deleteBookmark,
  checkBookmark,
};
