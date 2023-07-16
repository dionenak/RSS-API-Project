import express from "express";
import * as fs from 'fs';
import * as data from '../../data/input/data.json'
import {createRSS }from '../controller/routeController'

const router = express.Router();

router.get('/api',(req, res) =>{
    const file=fs.readFileSync('data/feed.xml', 'utf8')

    res.type('.rss').send(file)
     })


router.post('/api',(req, res) =>{
        // We need some error handling.
        const url=req.body.url
        const title=req.body.title
        const RSS=createRSS(data.items)
        res.send(`Got ${title},${url},${RSS}`)
        })

export default router;



    
      