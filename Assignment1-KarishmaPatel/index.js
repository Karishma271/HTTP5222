const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// Load the environment variables from .env
dotenv.config();

// Load db.js
const db = require("./modules/dance/db");

// Set up the Express app
const app = express();
const port = process.env.PORT || "8888";

// Set up application template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

// USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (request, response) => {
  let classList = await db.getDanceStudioes();
  // If there's nothing in the danceStudioes collection, initialize with some content then get the classes again
  if (!classList.length) {
    await db.initializeDanceStudioes();
    classList = await db.getDanceStudioes();
  }
  response.render("index", { danceClasses: classList });
});

app.get("/add", async (request, response) => {
  // Add a new dance class
  await db.addDanceStudio("Bollywood", "A vibrant and energetic dance form.", 60);
  response.redirect("/");
});

// Set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
