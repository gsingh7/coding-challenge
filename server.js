const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

var {getObjectsFromDb} = require('./server_functions/dbFunctions');

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
