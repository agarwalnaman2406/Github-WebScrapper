const url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./getReposHtml");

request(url, cb);

function cb(error, response, html){
    if(error){
        console.log(error);
    }else{
        extractLink(html);
    }
}


function extractLink(html){

    let $ = cheerio.load(html);
    let topiclinks = $(".no-underline.d-flex.flex-column.flex-justify-center");
    
    for(let i=0;i<topiclinks.length;i++){
        let href = $(topiclinks[i]).attr("href");
        let topic = href.split("/").pop();
        href = "https://github.com" + href;
        getReposPageHtml(href,topic);
    } 

}