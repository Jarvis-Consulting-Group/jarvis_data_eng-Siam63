const express = require('express');
const app = express();
const port = 3001;
const cors = require("cors");

app.get('/', (req, res) => {
  res.send('Connected to backend...');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());

// endpoint urls
app.use("/api/traders", require("./src/router/api/traders"));
app.use("/api/quotes", require("./src/router/api/quotes"));