
const express = require('express');
const cors = require('cors');

const indexRouter = require("./routes/index");
const receiptsRouter = require("./routes/receipts");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/", indexRouter);
server.use("/receipts", receiptsRouter);

const port = 4000;
server.listen(port, () => {
  console.log(`API started listening on port ${port}`);
})