import express from "express";
import fetch from "node-fetch"; 
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());


app.use(express.json());
//  route: fetch all products

app.get("/api/products", async (req, res) => {
      try {
      const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    
    const data = await response.json();
    res.json(data); // send to frontend
  } catch (error) {
          res.status(500).json({ error: error.message });
  }
});
  // route: fetch products by category
app.get("/api/products/category/:category", async (req, res) => {
    try {
    const { category } = req.params;
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    if (!response.ok) throw new Error("Failed to fetch products by category");
const data = await response.json();
    res.json(data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

    //  route: fetch single product
  
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) throw new Error("Product not found");

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

