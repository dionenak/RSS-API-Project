import express, { Request, Response } from "express";
import router from './router/api';
import * as bodyParser from "body-parser"
// set up our express app
const app = express();
// set the port
const port=8080

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router);

// listen for requests
app.listen(port, function(){
    console.log('Ready to Go!');
});