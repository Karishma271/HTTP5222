const mongoose = require("mongoose");

// MongoDB connection URL from environment variables
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// Define DanceStudio schema
const DanceStudioSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: Number,
});

// Create DanceStudio model based on schema
const DanceStudio = mongoose.model("DanceStudio", DanceStudioSchema);

// Function to connect to MongoDB
async function connect() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

// Function to retrieve all dance studios
async function getDanceStudios() {
  await connect(); // Connect to MongoDB
  return await DanceStudio.find({}); // Retrieve all documents from DanceStudio collection
}

// Function to initialize dance studios with some data
async function initializeDanceStudios() {
  const studioList = [
    {
      name: "Bollywood",
      description: "A vibrant and energetic dance form.",
      duration: 60,
    },
    {
      name: "Hip Hop",
      description: "An energetic Studio focusing on street dance styles.",
      duration: 45,
    },
    {
      name: "Krump",
      description:
        "A street dance characterized by free, expressive, exaggerated, and highly energetic movement.",
      duration: 50,
    },
  ];

  await connect(); // Connect to MongoDB
  await DanceStudio.deleteMany({}); // Clear existing data
  await DanceStudio.insertMany(studioList); // Insert new data
}

// Function to add a new dance studio
async function addDanceStudio(name, description, duration) {
  await connect(); // Connect to MongoDB
  const newDanceStudio = new DanceStudio({
    name,
    description,
    duration,
  });
  await newDanceStudio.save(); // Save new dance studio to the database
}

module.exports = {
  getDanceStudios,
  initializeDanceStudios,
  addDanceStudio,
};
