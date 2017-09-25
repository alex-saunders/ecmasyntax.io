import express                from 'express';
import * as contentful        from 'contentful';
import _                      from 'lodash';
import moment                 from 'moment';
import crypto                 from 'crypto';
import marked                 from 'marked';
import toc                    from 'markdown-toc';
import objectAssignDeep       from 'object-assign-deep';
import { space, accessToken } from '../../credentials';
import highlightJS            from 'highlight.js';

const contentfulClient = contentful.createClient({
  space: space || process.env.CONTENTFUL_SPACE,
  accessToken: accessToken || process.env.CONTENTFUL_TOKEN
});

marked.setOptions({
  highlight: function (code) {
    return highlightJS.highlightAuto(code).value;
  }
});

const renderer = new marked.Renderer();

renderer.heading = (text, level) => {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
 
  return `<h${level} id="${escapedText}">
            <a name="${escapedText}" href="#${escapedText}">${text}</a>
          </h${level}>`;
};

const loadArticles = async () => {
 try {
   const entries = await contentfulClient.getEntries({
       content_type: 'syntaxEntry',
       select: "sys.id,sys.updatedAt,fields.name,fields.tags,fields.category",
       include: 2,
     });

   const linkedEntries = Object.assign({}, entries.items);
   const includes = entries.includes.Entry;
    
   const hash = crypto.createHash('md5');
   Object.keys(linkedEntries).forEach((key) => {
     const entry = objectAssignDeep({}, linkedEntries[key]);
     linkEntry(includes, entry, 'category');
     linkEntry(includes, entry.fields.category, 'specification');

     const category = entry.fields.category;
     const specification = category.fields.specification
     const route = `/pages/${specification.fields.name}/${category.fields.name}/${entry.fields.name}`;

     entry.fields.route = encodeURI(route);
     entry.sys.updatedAt = moment(entry.sys.updatedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")

     linkedEntries[key] = entry;
     hash.update(entry.sys.id);
   })

   const id = hash.digest('hex');

   return {
    sys: {
      id
    },
    fields: linkedEntries,
   };
 }
 catch (e) {
   console.log(e);
 }
}

const fetchPage = async (req) => {

 let entries;
 if (req.params.pageName) {
    // the page name acts as a primary key so we can query using it as the only parameter
    entries = await contentfulClient.getEntries({
      content_type: 'syntaxEntry',
      'fields.name': decodeURI(req.params.pageName),
      include: 2,
    });
 }
 if (req.params.pageId) {
   entries = await contentfulClient.getEntries({
      content_type: 'syntaxEntry',
      'sys.id': decodeURI(req.params.pageId),
      include: 2,
    })
 }

 if (entries.total < 1) { return `no article found for ${_.join(Object.values(req.params).map(param => encodeURI(param)), '/')}` }

 const entry = entries.items[0];
 const contents = marked(toc(entry.fields.blob).content);
 const blob = marked(entry.fields.blob, { renderer: renderer });

 // strip out unnecessary fields to reduce network load
 const minReturnObj = objectAssignDeep({}, {
   sys: {
     updatedAt: moment(entry.sys.updatedAt).format("MMMM Do YYYY, HH:mm")
   },
   fields: {
     name: entry.fields.name,
     tags: entry.fields.tags,
     references: entry.fields.references,
     contents,
     blob,
     category: entry.fields.category,
   }
 });

 return minReturnObj;
}

const linkEntry = (includes, entry, param) => {
  entry.fields[param] = includes.find((include) => {
    return include.sys.id === entry.fields[param].sys.id
  });
}

const apiRouter = express.Router();

apiRouter.get('/pages', async (req, res) => {
  const pages = await loadArticles();
  res.send(JSON.stringify(pages));
});

apiRouter.get('/pages/:specId/:catId/:pageName', async (req, res) => {
  const article = await fetchPage(req, res)
  res.status(200).json(article);  
});

apiRouter.get('/pages/:pageId', async (req, res) => {
  const article = await fetchPage(req, res)
  res.status(200).json(article);  
});

apiRouter.get('*', (req, res) => {
  res.send('No endpoint');
});

module.exports = apiRouter;