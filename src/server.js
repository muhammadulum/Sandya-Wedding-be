import dotenv from "dotenv";
import app from "./app.js";
import { syncDB } from "./models/index.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

syncDB().then(() => {
  app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`),
  );
});
