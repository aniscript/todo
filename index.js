import express from "express";
import tasksRoute from "./routes/tasks.js";
import projectsRoute from "./routes/projects.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

//  middlewares
app.use(express.json());

// routes
app.use("/api/tasks", tasksRoute);
app.use("/api/projects", projectsRoute);

// server configuration
app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
