import config from "config";
import express from "express";
import * as fs from 'fs';
import xml from 'xml'
import * as data from '../../data/input/data.json'
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



    function createRSS(items:Array<{title:string,url:string}>){
      const projectInfo:{title:string,link:string,description:string,lang:'string'}=config.get('project')
      const xmlObject = {
        rss: [
          {
            _attr: {
              version: config.get('rss.version'),
            },
          },
          {
            channel: [
              { title: projectInfo.title },
              { link: projectInfo.link},
              { description: projectInfo.description},
              { language: projectInfo.lang },
          
            ...items.map((item) => {
    
              return {
                item: [
                  { title: item.title },
                  { link: item.url },
                ],
              }
            }),
          ]
          },
        ],
      }
      
      const xmlString = '<?xml version="1.0" encoding="UTF-8"?>' + xml(xmlObject,{indent:'  '})

     return xmlString;
    }