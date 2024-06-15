const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();


const db = require("./modules/dance/db");

// Express app
const app = express();
const port = process.env.PORT || "8888";

// application template 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// static files
app.use(express.static(path.join(__dirname, "public")));


app.get("/", async (request, response) => {
  let classList = await db.getDanceStudios();
 
  if (!classList.length) {
    await db.initializeDanceStudios();
    classList = await db.getDanceStudios();
  }
  response.render("index", { danceClasses: classList });
});

app.get("/add", async (request, response) => {
  // Add new dance class
  await db.addDanceStudio("Bollywood", "A vibrant and energetic dance form.", 60);
  response.redirect("/");
});

// server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
