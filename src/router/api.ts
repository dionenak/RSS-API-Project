import express from "express";
import * as fs from 'fs';
const router = express.Router();

router.get('/api',(req, res) =>{
    const file=fs.readFileSync('data/feed.xml', 'utf8')
    // we want to return rss xml
    res.type('.rss')
    // If we want to send the file, we could use : res.download('data/feed.xml')
    res.send(file)
    })

    router.post('/api',(req, res) =>{
        // We need some error handling.
        const url=req.body.url
        const title=req.body.title

        res.send(`Got ${title},${url}`)
        })

    export default router;

