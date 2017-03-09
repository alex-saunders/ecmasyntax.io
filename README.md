# ecmasytax.io
SPA for ECMAScript syntax reference

Made using React & React-Redux. React Server side rendering & critical path CSS enabled.

# Install
1. `npm i`

# Dev

### Server side
1. `npm run serverDev` (watches and compiles changes to src/server.js)
2. When ready - `npm run runServer` (runs the compiled server.js file)
3. Navigate to [localhost:8080](http://localhost:8080/)

### Client side
1. `npm run clientDev` (watches and compiles changes to client side code & runs the current compiled version of the server)
2. Navigate to [localhost:8080](http://localhost:8080/)

# Build
1. Add markdown files to the src/articles folder using front matter style seen in other files in this folder
2. `npm run build`
3. navigate to [localhost:8080](http://localhost:8080/)
