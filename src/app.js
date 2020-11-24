const express = require('express');
const app = express();
const PORT = 3000;

const router = require('./routes');

app.use('/', router);

app.listen(PORT, () => {
  console.log(`server listen at port ${PORT}`);
});