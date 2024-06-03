import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";

dotenv.config();
const app = express();

// Use CORS middleware
app.use(cors());

// Connect to DB
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Swagger

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  // Update here to include the path to your controllers
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use("/allusers", userRoutes);
