const express = require("express");
const app = express();
const cors = require("cors");
const menu = require("./routes/menu");
const auth = require("./routes/auth");
const order = require("./routes/order");
const port = 3000;


app.use(cors())
app.use(express.json());
app.use("/api/menu", menu);
app.use("/api/auth", auth);
app.use("/api/order", order);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});