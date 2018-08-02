// a built-in module to make access to different directories easier
const path = require('path');
const express = require('express');

var app = express();

const publicPath = path.join(__dirname, '../public');
// set up port for heroku
const port = process.env.PORT || 3000;

// use the static html document
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

