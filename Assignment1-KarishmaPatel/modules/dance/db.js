const mongoose = require("mongoose"); // Import Mongoose

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// DanceStudio Schema and model
const DanceClassSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: Number,
});

const DanceStudio = mongoose.model("DanceStudio", DanceStudioSchema);


async function connect() {
  await mongoose.connect(dbUrl); 
}

// Get dance Studios 
async function getDanceStudios() {
  await connect();
  return await DanceStudio.find({});
}

// Initialize danceStudioes collection 
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

// add dance Studio 
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
