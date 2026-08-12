import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Admin from "./Admin.js";
import Guest from "./Guest.js";
import RSVP from "./RSVP.js";
import WeddingInfo from "./WeddingInfo.js";

// Relasi
Guest.hasOne(RSVP, { foreignKey: "guest_id" });
RSVP.belongsTo(Guest, { foreignKey: "guest_id" });

// Sinkronisasi model
const syncDB = async () => {
  await sequelize.sync({ alter: true });
  console.log("✅ Database synchronized");
};

export { sequelize, Admin, Guest, RSVP, WeddingInfo, syncDB };
