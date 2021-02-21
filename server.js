const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');
const PORT = process.env.PORT || 5000;

var {getObjectsFromDb} = require('./dbFunctions');

app.use(cors()); //todo this is only for development environment and needs to be determined if requires fixing for production
app.use(express.static(path.join(__dirname, 'build')));

// @route GET /locations?q=startString
// @desc  Returns all locations starting with starting string (returns null for query string less than 2 characters)
app.get('/locations', (req, res)=>{
    let startString = req.query.q;
    return getObjectsFromDb(startString)
        .then(returnObject=>{
            res.send(returnObject);
        })
        .catch(err=>{
            console.error(err);
            res.send({error: 'An error has occurred'});
        })
});


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);
