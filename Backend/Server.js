import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "ZrQEPSkKMmsyMi5jc2N5czMyMjQ1QGdtYWlsLmNvbQ==";

app.get("/", (req, res) => {
  res.send("Welcome to the CarFinder backend server. Use /trending-cars and /proxy-image endpoints.");
});

app.get("/trending-cars", async (req, res) => {
  try {
    const response = await fetch("https://api.auto.dev/listings", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching trending cars:", err);
    res.status(500).json({ error: err.message });
  }
});

// Image proxy endpoint to avoid CORS and hotlinking issues
app.get("/proxy-image", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl || imageUrl.trim() === "") {
    return res.status(400).json({ error: "Missing or empty image URL" });
  }

  try {
    const validUrl = new URL(imageUrl);

    const response = await fetch(validUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
        // Referer: "https://retail.photos.vin/", // Uncomment if needed
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch image" });
    }

    res.set("Content-Type", response.headers.get("content-type") || "image/jpeg");

    response.body.pipe(res).on("error", (err) => {
      console.error("Error streaming image:", err);
      if (!res.headersSent) {
        res.status(500).end();
      }
    });
  } catch (err) {
    console.error("Proxy image error:", err);
    res.status(400).json({ error: "Invalid URL" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
