const express = require('express');
const app = express();

const port = 1337;

app.use('/node_modules', express.static('node_modules'));
app.use('/', express.static('public'));
app.listen(port, () => console.log(
    `Express server running at http://localhost:${port}`));