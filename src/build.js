import fs from 'fs';
import fm from 'front-matter';
import walk from 'walk';
import path from 'path';
import React from 'react';
import ReplaceExt from 'replace-ext';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import jsdom from 'jsdom';
import highlightJS from 'highlight.js';
import contentful from 'contentful';

const window = jsdom.jsdom('', {
  features: {
    FetchExternalResources: false, // disables resource loading over HTTP / filesystem
    ProcessExternalResources: false, // do not execute JS within script blocks
  },
}).defaultView;
const DOMPurify = createDOMPurify(window);

marked.setOptions({
  highlight: (code) => {
    return highlightJS.highlightAuto(code).value;
  }
});
// obj.html = DOMPurify.sanitize(marked(obj.body));


const client = contentful.createClient({
  space: 'ygp49j9ncoqn',
  accessToken: '3ff5816ecb76807c88a570e0e7ab89b77ddde9697d29945ca82d60399d6182e8'
});

export default function buildArticles() {
  return new Promise((resolve, reject) => {
    client.getEntries({
      content_type: 'syntaxEntry',
      include: 2,
    })
    .then((entries) => {
      resolve(entries);
    })
    .catch((err) => {
      reject(err);
    });
  });
}

