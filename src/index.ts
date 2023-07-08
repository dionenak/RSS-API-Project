import express, { NextFunction,Request, Response } from "express";
// import router from "./router/api"
// set up our express app
const app = express();

app.get('/api', (req, res) => res.send('Its working!'));


app.use(express.static('public'));

 app.use(express.json());
// initialize routes
//  app.use('/api',router);

// error handling middleware
app.use(function(err:Error,req:Request,res:Response,next:NextFunction){
    //console.log(err);
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('Ready to Go!');
});