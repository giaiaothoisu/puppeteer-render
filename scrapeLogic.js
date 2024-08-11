const express = require("express");
const puppeteer = require("puppeteer");
require("dotenv").config();

const app = express();

const scrapeLogic = async (url) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto(url);

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    // await page.type(".search-box__input", "automate beyond recorder");

    // Wait and click on first result
    // const searchResultSelector = ".search-box__link";
    // await page.waitForSelector(searchResultSelector);
    // await page.click(searchResultSelector);

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector("title");
    const fullTitle = await textSelector.evaluate((el) => el.textContent);

    // Print the full title
    const logStatement = `The title of this blog post is ${fullTitle}`;
    console.log(logStatement);
    return logStatement;
  } catch (e) {
    console.error(e);
    return `Something went wrong while running Puppeteer: ${e}`;
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
