#!/usr/bin/env node
var chalk = require('chalk'),
pkgUp = require('pkg-up'),
fs = require('fs'),
axios = require('axios'),
deps = (pkg,depType) => pkg[depType] && typeof pkg[depType] === 'object'? Object.keys(pkg[depType]): [] ;
(async () => {
const pkgPath = await pkgUp()
fs.readFile(pkgPath, 'utf8', (err, data) => { 
if(err) throw err
var pkgs = JSON.parse(data),
pcks =  [].concat(deps(pkgs,'dependencies'),deps(pkgs, 'devDependencies'));
pcks.map(async name =>{
var data = await axios.get(`http://registry.npmjs.com/${name}/latest`)
console.log(chalk.red(name) + ' : ' + chalk.green(data.data.license))
})})})();    

    
