import fs from 'fs';
import fm from 'front-matter';
import walk from 'walk';
import path from 'path';
import React from 'react';
import ReplaceExt from 'replace-ext';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import jsdom from 'jsdom';

var __src = 'src';
var __public = 'public';
var __articles = 'articles';

const window = jsdom.jsdom('', {
  features: {
    FetchExternalResources: false, // disables resource loading over HTTP / filesystem
    ProcessExternalResources: false // do not execute JS within script blocks
  }
}).defaultView;
const DOMPurify = createDOMPurify(window);

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

function deleteFolder(folder) {
  if( fs.existsSync(folder) ) {
    fs.readdirSync(folder).forEach(function(file,index){
      var curPath = path.join(folder, file);
      if(fs.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folder);
  }
};

export const buildArticles = () => {

  return new Promise((resolve, reject) => {

    deleteFolder(path.join(__public, __articles));
    fs.mkdirSync(path.join(__public, __articles));

    var files = [];
    var walker = walk.walk(path.join(__src, __articles));
    walker.on("file", function (root, file, next) {

      var absPath = path.join(root, file.name);
      var content = fs.readFileSync(absPath, 'utf-8');
      var obj = fm(content);
      // sanitize (just in case), convert to html & syntax highlight the article body
      obj.html = marked(DOMPurify.sanitize(obj.body));

      var buildFolder = root.replace(__src, __public);
      var buildPath = ReplaceExt(absPath.replace(__src, __public), '.json');

      if (!fs.existsSync(buildFolder)) {
        fs.mkdirSync(buildFolder);
      }
      fs.writeFile(buildPath, JSON.stringify(obj), 'utf8');
      next();
    });
    walker.on("end", function () {
      console.log('Articles built');
      resolve();
    });
  })
}
