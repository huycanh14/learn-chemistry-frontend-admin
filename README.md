# frontend-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### convert array string data in relationship to object => total 
https://stackoverflow.com/questions/1086404/string-to-object-in-js
var properties = string.split(', ');
var obj = {};
properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
});

example: 
let data = [
    "chapters : 0",
    "lessons : 0",
    "theories : 0",
    "type_of_lessons : 0",
    "questions : 0",
    "answers : 0",
    "explains : 0",
    "documents : 0"
];
var obj = {};
data.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
});
console.log(data)
console.log(obj) => object string after convert

