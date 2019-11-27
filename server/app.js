const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const cors = require('cors');
let output = 0;

app.use(cors());

app.get('/', (req, res) => {
    fs.readFile('output.txt', (err, data) => {
        if (err)
            return res.send();
        res.send(data.slice(output - data.length));
        output = data.length;
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
