const mongoose = require("mongoose"); // Import Mongoose

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// Set up DanceStudio Schema and model
const DanceClassSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: Number,
});

const DanceStudio = mongoose.model("DanceStudio", DanceStudioSchema);

// MONGODB FUNCTIONS
async function connect() {
  await mongoose.connect(dbUrl); // Connect to MongoDB
}

// Get all dance Studioes from the danceStudioes collection
async function getDanceStudioes() {
  await connect();
  return await DanceStudio.find({});
}

// Initialize danceStudioes collection with some data
async function initializeDanceStudioes() {
  const StudioList = [
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
      description: "A street dance characterized by free, expressive, exaggerated, and highly energetic movement.",
      duration: 50,
    },
  ];
  await DanceStudio.insertMany(StudioList);
}

// Function to add a dance Studio to the danceStudioes collection
async function addDanceStudio(StudioName, StudioDescription, StudioDuration) {
  let newDanceStudio = new DanceStudio({
    name: StudioName,
    description: StudioDescription,
    duration: StudioDuration,
  });
  // This is the line which actually saves newDanceStudio to the DB
  await newDanceStudio.save();
}

module.exports = {
  getDanceStudioes,
  initializeDanceStudioes,
  addDanceStudio,
};
