const express = require("express");

const app = express();
app.use(express.json())

const HOST = "http://localhost:3000"

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
    const shortcode = shortcodeGenerator();
    const shortLink = `${HOST}/${shortcode}`;

    const validity = data.validity || "30";
    const validityNumber = parseInt(validity, 10)
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + validityNumber);

    res.json({shortLink: shortLink, expiry: expiry.toISOString()})
})

app.listen(3000)