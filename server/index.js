const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
const HOST = "http://localhost:8000";
const SHORTURLS_FILE = path.join(__dirname, "shorturls.json");

function read() {
  try {
    const data = fs.readFileSync(SHORTURLS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading shorturls.json:", error);
    return [];
  }
}

// Function to write to the shorturls.json file
function write(shortUrls) {
  try {
    fs.writeFileSync(SHORTURLS_FILE, JSON.stringify(shortUrls, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing to shorturls.json:", error);
    return false;
  }
}

function shortcodeGenerator() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

app.post("/shorturls", async (req, res) => {
    const data = req.body;
    
    if (!data.url) {
        return res.status(400).json({ error: "Original URL is required" });
    }
    
    const shortcode = shortcodeGenerator();
    const shortLink = `${HOST}/${shortcode}`;

    const validity = data.validity || "30";
    const validityNumber = parseInt(validity, 10)
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + validityNumber);
    
    const shortUrlEntry = {
        shortCode: shortcode,
        originalUrl: data.url,
        shortLink: shortLink,
        expiry: expiry.toISOString(),
        createdAt: new Date().toISOString()
    };
    
    const shortUrls = read();
    shortUrls.push(shortUrlEntry);
    const success = write(shortUrls);
    
    if (!success) {
        return res.status(500).json({ error: "Failed to save short URL" });
    }

    res.json({
        shortLink: shortLink, 
        expiry: expiry.toISOString()
    });
})

app.get("/:shortcode", async (req, res) => {
    try {
        const { shortcode } = req.params;
        const shorturls = read();
        
        const url = shorturls.find(url => url.shortCode === shortcode);
        
        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }
        
        if (new Date(url.expiry) < new Date()) {
            return res.status(410).json({ error: "URL has expired" });
        }
        
        res.json({url:url.originalUrl});
    } catch (error) {
        console.error("Error retrieving URL:", error);
        res.status(500).json({ error: "Server error" });
    }
});
app.listen(8000)