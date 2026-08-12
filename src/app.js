import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";
import rsvpRoutes from "./routes/rsvpRoutes.js";
import weddingRoutes from "./routes/weddingRoutes.js";

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: [
      "https://sandyatech.tech",
      "https://www.sandyatech.tech",
      "http://localhost:3000",
      "https://www.wedding.sandyatech.tech",
      "https://wedding.sandyatech.tech",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/wedding", weddingRoutes);

export default app;
