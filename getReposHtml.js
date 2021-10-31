const request = require("request");
const cheerio = require("cheerio");
const { link } = require("fs");
const getIssuesPageHtml = require("./getIssuesHtml");

function getReposPageHtml(link, topic){

    request(link, cb);

    function cb(error, response, html){
        if(error){
            console.log(error);
        }else{
            extractRepos(html, topic);
        }
    }

}


function extractRepos(html,topic){

    let $ = cheerio.load(html);
    let headingsArr = $(".f3.color-fg-muted.text-normal.lh-condensed");
    // console.log(topic);
    for(let i=0;i<8;i++){
        let twoanchors = $(headingsArr[i]).find("a");
        let linkan = $(twoanchors[1]).attr("href");
        let fulllink = `https://github.com${linkan}/issues`;
        // console.log(fulllink);
        let reponame = linkan.split("/").pop();
        getIssuesPageHtml(fulllink, topic, reponame);
    }

}

module.exports = getReposPageHtml;