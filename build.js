import fs from 'fs';
import fm from 'front-matter';
import walk from 'walk';
import path from 'path';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import ReplaceExt from 'replace-ext';

var __src = 'src';
var __public = 'public';

function deleteFolder(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolder(path.join(__public, 'articles'));

var files = [];
var walker = walk.walk(path.join(__src, 'articles'));
walker.on("file", function (root, file, next) {

  var absPath = path.join(root, file.name);
  var content = fs.readFileSync(absPath, 'utf-8');
  var obj = fm(content);
  obj.jsx = renderToStaticMarkup(
      <Markdown>
          { obj.body }
      </Markdown>
  );

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
});
