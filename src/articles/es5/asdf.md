---
title: es5
description: Nothing to see here
---

# es5

## sub-folders working correctly

```js
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

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

let lang = 'js';
const func = (req, res) => {
  console.log(`sample ${lang} syntax`);
}
```
