# ecmasytax.io

This is an offline-first PWA for ECMAScript syntax reference. It is built with React (+ Redux) and features server-side rendering complete with critical path CSS.

![preview](https://user-images.githubusercontent.com/22820481/30816456-e8238670-a20d-11e7-9d73-5ae97b398df6.jpg)

## API

ECMASyntax.io features an api accessible at `/api` which currently features 2 endpoints:

- `/pages` - retrieve a list of all pages
- `/pages/{specification}/{category}/{name}` - retrieve the content for a particular page
 
## Running the site locally

1. Clone the repo
2. `cd ecmasyntax.io`
3. `npm install`

### Setting up some secrets

The content for ECMASyntax is fetched from [contentful](https://www.contentful.com/) and in order to run the site locally you'll need to edit `credentials.js`, into which you will need to update the `space` and `accessToken` properties using your respective contentful space values. You can use these values which correspond to a demo contentful space with the correct content model and some sample data (although as this is publically avaliable it will obviously be subject to change):

```javascript
// credentials.js - demo values
module.exports = {
  space: '55mxa9rwgn9l',
  accessToken: '3a658f972dd2f2cc8cc5dc4977970dc0009584ab4859306e5c9649a8d109b965',
};
```

Once you've done that you should be able to run `npm run dev` to set up a development environment or `npm start` to run a full, production ready build.

Finally, navigate to [localhost:5000](https://localhost:5000).


## License

The MIT License © 2017 Alex Saunders. All rights reserved.
