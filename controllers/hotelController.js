const Hotel = require("../models/Hotel");

const storeHotel = async (req, res) => {
  let { name, address, city, country, contact_email, phone_number, hotel_image } = req.body;
  const hotel = Hotel.fill({ name, address, city, country, contact_email, phone_number, hotel_image });
  await hotel.insert();
  res.json({
    status: "success",
    message: "Hotel added successfully",
    data: hotel,
  });
};

const getHotels = async (req, res) => {
  try {
    const { city, limit } = req.query;
    let query = "SELECT * FROM hotels WHERE 1=1";
    let params = [];
    
    // Filter by city if provided
    if (city) {
      query += " AND city LIKE ?";
      params.push(`%${city}%`);
    }
    
    // Add ordering
    query += " ORDER BY created_at DESC";
    
    // Add limit if provided
    if (limit) {
      query += " LIMIT ?";
      params.push(parseInt(limit));
    }
    
    const hotels = await Hotel.query(query, params);
    
    // Transform data to include proper fields
    const transformedHotels = hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      location: `${hotel.city}, ${hotel.country}`,
      city: hotel.city,
      country: hotel.country,
      address: hotel.address,
      contact_email: hotel.contact_email,
      phone_number: hotel.phone_number,
      image: hotel.hotel_image || 'assets/images/raddison.png',
      // Use price_per_night from database or fallback
      price: hotel.price_per_night || 75000,
      price_per_night: hotel.price_per_night || 75000,
      rating: 4.5, // You might want to calculate this from bookings/reviews
      created_at: hotel.created_at,
      updated_at: hotel.updated_at
    }));
    
    res.json({
      status: "success",
      message: "Hotels fetched successfully",
      data: transformedHotels,
    });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch hotels: " + error.message,
    });
  }
};

const getHotelById = async (req, res) => {
  try {
    let { id } = req.params;
    const hotel = await Hotel.find(id);
    if (!hotel) {
      return res.status(404).json({
        status: "error",
        message: "Hotel not found",
      });
    }
    
    // Transform data
    const transformedHotel = {
      id: hotel.id,
      name: hotel.name,
      location: `${hotel.city}, ${hotel.country}`,
      city: hotel.city,
      country: hotel.country,
      address: hotel.address,
      contact_email: hotel.contact_email,
      phone_number: hotel.phone_number,
      image: hotel.hotel_image || 'assets/images/raddison.png',
      price: hotel.price_per_night || 75000,
      price_per_night: hotel.price_per_night || 75000,
      rating: 4.5,
      created_at: hotel.created_at,
      updated_at: hotel.updated_at
    };
    
    res.json({
      status: "success",
      message: "Hotel fetched successfully",
      data: transformedHotel,
    });
  } catch (error) {
    console.error('Error fetching hotel:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch hotel: " + error.message,
    });
  }
};

const searchHotels = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        status: "error",
        message: "Search query is required",
      });
    }
    
    const query = `
      SELECT * FROM hotels 
      WHERE name LIKE ? 
         OR city LIKE ? 
         OR country LIKE ? 
         OR address LIKE ?
      ORDER BY name ASC
    `;
    const searchTerm = `%${q}%`;
    const params = [searchTerm, searchTerm, searchTerm, searchTerm];
    
    const hotels = await Hotel.query(query, params);
    
    const transformedHotels = hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      location: `${hotel.city}, ${hotel.country}`,
      city: hotel.city,
      country: hotel.country,
      address: hotel.address,
      contact_email: hotel.contact_email,
      phone_number: hotel.phone_number,
      image: hotel.hotel_image || 'assets/images/raddison.png',
      price: hotel.price_per_night || 75000,
      price_per_night: hotel.price_per_night || 75000,
      rating: 4.5,
      created_at: hotel.created_at,
      updated_at: hotel.updated_at
    }));
    
    res.json({
      status: "success",
      message: "Hotels search completed successfully",
      data: transformedHotels,
    });
  } catch (error) {
    console.error('Error searching hotels:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to search hotels: " + error.message,
    });
  }
};

const getHotelsByCity = async (req, res) => {
  try {
    const { city } = req.params;
    
    const query = "SELECT * FROM hotels WHERE city LIKE ? ORDER BY name ASC";
    const params = [`%${city}%`];
    
    const hotels = await Hotel.query(query, params);
    
    const transformedHotels = hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      location: `${hotel.city}, ${hotel.country}`,
      city: hotel.city,
      country: hotel.country,
      address: hotel.address,
      contact_email: hotel.contact_email,
      phone_number: hotel.phone_number,
      image: hotel.hotel_image || 'assets/images/raddison.png',
      price: hotel.price_per_night || 75000,
      price_per_night: hotel.price_per_night || 75000,
      rating: 4.5,
      created_at: hotel.created_at,
      updated_at: hotel.updated_at
    }));
    
    res.json({
      status: "success",
      message: `Hotels in ${city} fetched successfully`,
      data: transformedHotels,
    });
  } catch (error) {
    console.error('Error fetching hotels by city:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch hotels by city: " + error.message,
    });
  }
};

// Keep your existing functions...
const updateHotel = async (req, res) => {
  let { id } = req.params;
  let { name, address, city, country, contact_email, phone_number, hotel_image } = req.body;
  const hotel = await Hotel.find(id);
  if (!hotel) {
    return res.status(404).json({
      status: "error",
      message: "Hotel not found",
    });
  }
  hotel.fill({ name, address, city, country, contact_email, phone_number, hotel_image });

  await hotel.update();

  res.json({
    status: "success",
    message: "Hotel updated successfully",
    data: hotel,
  });
};

const partialHotelUpdate = async (req, res) => {
  let { id } = req.params;
  const hotel = await Hotel.find(id);
  if (!hotel) {
    return res.status(404).json({
      status: "error",
      message: "Hotel not found",
    });
  }
  hotel.fill(req.body);

  await hotel.update();

  res.json({
    status: "success",
    message: "Hotel updated successfully",
    data: hotel,
  });
};

const deleteHotel = async (req, res) => {
  let { id } = req.params;
  const deleted = await Hotel.delete(id);
  if (!deleted) {
    return res.status(404).json({
      status: "error",
      message: "Failed to delete hotel",
    });
  }

  res.json({
    status: "success",
    message: "Hotel deleted successfully",
  });
};

const attachInstructor = async (req, res) => {
  let { id } = req.params;
  const hotel = await Hotel.find(id);
  if (!hotel) {
    return res.status(404).json({
      status: "error",
      message: "Hotel not found",
    });
  }
  let { instructor_id } = req.body;
  hotel.instructor_id = instructor_id;

  await hotel.save();

  res.json({
    status: "success",
    message: "Instructor attached successfully",
    data: hotel,
  });
};

module.exports = {
  storeHotel,
  getHotels,
  getHotelById,
  updateHotel,
  partialHotelUpdate,
  deleteHotel,
  attachInstructor,
  searchHotels,
  getHotelsByCity,
};
