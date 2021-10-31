const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const PDFDocument = require('pdfkit');

function getIssuesPageHtml(link, topic, reponame){

    request(link, cb);

    function cb(error, response, html){
        if(error){
            console.log(error);
        }else{
            // console.log(html);
            extractIssues(html, topic, reponame);
        }
    }

}

function extractIssues(html, topic, reponame){

    let $ = cheerio.load(html);
    let issuesElemArray = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let arr = [];
    for(let i=0;i<issuesElemArray.length;i++){
        let linkiss = $(issuesElemArray[i]).attr("href");
        linkiss = `https://github.com${linkiss}`;
        arr.push(linkiss);
        console.log(linkiss);
    }

    let folderPath = path.join(__dirname , topic);
    dirCreator(folderPath);
    let filePath = path.join(folderPath, reponame + ".pdf");
    let text = JSON.stringify(arr);
    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(text);
    pdfDoc.end();
}

function dirCreator(folderPath){

    if(fs.existsSync(folderPath)==false){
        fs.mkdirSync(folderPath);
    }



}


module.exports = getIssuesPageHtml;