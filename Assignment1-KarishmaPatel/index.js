const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

const db = require("./modules/dance/db");

// Express app
const app = express();
const port = process.env.PORT || "8888";

// Application template 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware to handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Home page route
app.get("/", async (request, response) => {
  let danceStudios = await db.getDanceStudios();
 
  if (!danceStudios.length) {
    await db.initializeDanceStudios();
    danceStudios = await db.getDanceStudios();
  }
  response.render("index", { danceStudios: danceStudios });
});

// Add new studio form page
app.get("/add", (request, response) => {
  response.render("add");
});

// Add new studio form submission
app.post("/add", async (request, response) => {
  const { name, description, duration } = request.body;
  await db.addDanceStudio(name, description, duration);
  response.redirect("/");
});

// About page route
app.get("/about", (request, response) => {
  response.render("about");
});

// Contact page route
app.get("/contact", (request, response) => {
  response.render("contact");
});

// Server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
