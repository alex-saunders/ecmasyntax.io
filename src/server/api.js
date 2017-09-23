import express                from 'express';
import * as contentful        from 'contentful';
import crypto                 from 'crypto';
import marked                 from 'marked';
import toc                    from 'markdown-toc';
import { space, accessToken } from '../../credentials';

const contentfulClient = contentful.createClient({
  space: space || process.env.CONTENTFUL_SPACE,
  accessToken: accessToken || process.env.CONTENTFUL_TOKEN
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
     const entry = linkedEntries[key];
     linkEntry(includes, entry, 'category');
     linkEntry(includes, entry.fields.category, 'specification');

     const category = entry.fields.category;
     const specification = category.fields.specification
     const route = `/pages/${specification.fields.name}/${category.fields.name}/${entry.fields.name}`;

     entry.fields.route = encodeURI(route);
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
 const pageName = decodeURI(req.params.pageId);

 // the page name acts as a primary key so we can query using it as the only parameter
 const entries = await contentfulClient.getEntries({
   content_type: 'syntaxEntry',
   'fields.name': pageName,
 })

 const entry = entries.items[0];
 const contents = marked(toc(entry.fields.blob).content);
 const blob = marked(entry.fields.blob, { renderer: renderer });
 
 entry.fields.contents = contents;
 entry.fields.blob = blob;

 return entry;
}

const linkEntry = (includes, entry, param) => {
  entry.fields[param] = includes.find((include) => {
    return include.sys.id === entry.fields[param].sys.id
  });
}

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('ecmasyntax.io API');
})

apiRouter.get('/pages', async (req, res) => {
  const pages = await loadArticles();
  res.send(JSON.stringify(pages));
});

apiRouter.get('/pages/:specId/:catId/:pageId', async (req, res) => {
  const article = await fetchPage(req, res)
  res.status(200).json(article);  
});

module.exports = apiRouter;