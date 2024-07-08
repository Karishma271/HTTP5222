const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const db = require("./modules/dance/db");

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
  let danceClasses = await db.getDanceStudios();
  if (!danceClasses.length) {
    await db.initializeDanceStudios();
    danceClasses = await db.getDanceStudios();
  }
  res.render("index", { danceClasses });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  const { name, description, duration } = req.body;
  await db.addDanceStudio(name, description, duration);
  res.redirect("/");
});

app.get("/list", async (req, res) => {
  const danceClasses = await db.getDanceStudios();
  res.render("list", { danceClasses });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
