const API_URL = "http://localhost:5000/api/items";

export const fetchMenuData = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    return data.map(item => ({
      ...item,
      price: Number(item.price),
      rating: Number(item.rating),
      image: item.image
        ? `http://localhost:5000/uploads/${item.image}`
        : "https://via.placeholder.com/300x200?text=No+Image"
    }));

  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
};