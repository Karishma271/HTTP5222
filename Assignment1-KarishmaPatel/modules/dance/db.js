const mongoose = require("mongoose");

// MongoDB connection URL
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// Define DanceStudio schema
const DanceStudioSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: Number,
});

// Create DanceStudio model
const DanceStudio = mongoose.model("DanceStudio", DanceStudioSchema);

// Function to establish database connection
async function connect() {
  await mongoose.connect(dbUrl); 
}

// Function to get all dance studios
async function getDanceStudios() {
  await connect();
  return await DanceStudio.find({});
}

// Function to initialize dance studios collection with dummy data
async function initializeDanceStudios() {
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

// Function to add a new dance studio
async function addDanceStudio(StudioName, StudioDescription, StudioDuration) {
  let newDanceStudio = new DanceStudio({
    name: StudioName,
    description: StudioDescription,
    duration: StudioDuration,
  });
  
  await newDanceStudio.save();
}

module.exports = {
  getDanceStudios,
  initializeDanceStudios,
  addDanceStudio,
};
