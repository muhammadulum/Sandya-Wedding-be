import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Guest = sequelize.define("Guest", {
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  invitation_sent: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_attending: { type: DataTypes.BOOLEAN, defaultValue: null },
  note: { type: DataTypes.TEXT },
});

export default Guest;
