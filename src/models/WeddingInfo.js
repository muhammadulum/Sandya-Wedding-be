import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const WeddingInfo = sequelize.define("WeddingInfo", {
  groom_name: DataTypes.STRING,
  bride_name: DataTypes.STRING,
  wedding_date: DataTypes.DATE,
  wedding_time: DataTypes.STRING,
  location: DataTypes.TEXT,
  map_url: DataTypes.TEXT,
  verse: DataTypes.TEXT,
  music_url: DataTypes.TEXT,
  photo_url: DataTypes.TEXT,
});

export default WeddingInfo;
