import express from "express";

const port = 5000;
const app = express();

const cors = require("cors");

// Use CORS middleware
app.use(cors());

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
