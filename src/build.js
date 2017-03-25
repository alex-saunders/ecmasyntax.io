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

function discoverSrcArticles() {

  return new Promise((resolve, reject) => {
    var files = [];
    var walker = walk.walk(path.join(__src, __articles));
    walker.on('file', function(root, fileStats, next) {
      var obj = {
        name: fileStats.name,
        parentDirs: root.split(path.sep),
        path: path.join(root, fileStats.name)
      }
      files.push(obj);
      next();
    });
    walker.on('end', function() {
      resolve(files); 
    });
  });
}

function buildParentPath(parentDirs, index) {

  let currPath = '';
  for (let i = 0; i < (index + 1); i += 1) {
    currPath = path.join(currPath, parentDirs[i]);
  }
  currPath = currPath.replace(__src, __public);
  return currPath;
}

function parseAndCreateArticles(files) {
  files.forEach((file) => {
    const parentDirs = file.parentDirs;
    parentDirs.forEach((parentDir, index) => {
      const tempParentPath = buildParentPath(parentDirs, index);
      if (!fs.existsSync(tempParentPath)) {
        fs.mkdirSync(tempParentPath);
      }
    });
    const content = fs.readFileSync(file.path, 'utf-8');
    const obj = fm(content);
    // // sanitize (just in case), convert to html & syntax highlight the article body
    obj.html = DOMPurify.sanitize(marked(obj.body));

    let buildPath = file.path.replace(__src, __public);
    buildPath = buildPath.replace('.md', '.json');
    fs.writeFileSync(buildPath, JSON.stringify(obj));
  });
}

function buildArticles() {
  return new Promise((resolve, reject) => {
    deleteFolder(path.join(__public, __articles));
    discoverSrcArticles()
    .then((files) => {
      // console.log(files);
      parseAndCreateArticles(files);
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export default buildArticles;


