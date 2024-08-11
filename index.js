const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();

const PORT = process.env.PORT || 4000;

// app.get("/scrape", (req, res) => {
//   scrapeLogic(res);
// });

app.get("/scrape", async (req, res) => {
  const url = req.query.link;
  if (!url) {
    res.status(400).send("Missing URL parameter");
    return;
  }
  const result = await scrapeLogic(url);
  res.send(result);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
