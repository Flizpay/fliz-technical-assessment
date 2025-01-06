import mongoose from "mongoose";

const AdventureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  resourceCost: {
    coins: { type: Number, default: 0 },
    peasants: { type: Number, default: 0 },
    scrolls: { type: Number, default: 0 },
  },
  rewards: {
    coins: { type: Number, default: 0 },
    peasants: { type: Number, default: 0 },
    scrolls: { type: Number, default: 0 },
  },
  timeRequired: { type: Number, required: true }, // in minutes
  difficulty: { type: String, required: true },
});

const AdventureModel = mongoose.model("adventure", AdventureSchema);

export default AdventureModel;
