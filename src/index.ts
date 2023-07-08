import express, { NextFunction,Request, Response } from "express";

// set up our express app
const app = express();
// set the port
const port=8080
// how to handle get
app.get('/api', (req, res) => res.send('Its working!'));

// listen for requests
app.listen(port, function(){
    console.log('Ready to Go!');
});