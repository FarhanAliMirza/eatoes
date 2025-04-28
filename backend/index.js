const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const menu = require("./routes/menu");
const port = 3000;


app.use(cors())
app.use(express.json());
app.use("/api/menu", menu);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});