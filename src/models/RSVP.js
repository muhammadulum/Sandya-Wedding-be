import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const RSVP = sequelize.define("RSVP", {
  name: { type: DataTypes.TEXT },
  attending: { type: DataTypes.BOOLEAN, allowNull: false },
  message: { type: DataTypes.TEXT },
});

export default RSVP;
