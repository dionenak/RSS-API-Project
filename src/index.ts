import express, { Request, Response } from "express";
import * as fs from 'fs'

// set up our express app
const app = express();
// set the port
const port=8080
// how to handle get
app.get('/api', (req, res) =>{
    const file=fs.readFileSync('data/feed.xml', 'utf8')
    // we want to return rss xml
    res.type('.rss')
    // If we want to send the file, we could use : res.download('data/feed.xml')
    res.send(file)
    });

// listen for requests
app.listen(port, function(){
    console.log('Ready to Go!');
});