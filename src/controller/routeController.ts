import config from "config"
import xml from 'xml'


export function createRSS(items:Array<{title:string,url:string}>):string{
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