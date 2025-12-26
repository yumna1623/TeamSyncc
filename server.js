import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js"; 



dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cors({ origin: "https://teamsyncc-production.up.railway.app", credentials: true }));
const allowedOrigins = [
  "http://localhost:5173",                   // local dev
  "https://teamsyncc-production.up.railway.app" // deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman or mobile apps)
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/departments", departmentRoutes); // 👈 mount here
app.use("/api/users", userRoutes);


app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
