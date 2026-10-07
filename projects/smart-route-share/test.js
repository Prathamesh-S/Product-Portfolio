const fs=require('fs');
const vm=require('vm');
const context={};
vm.createContext(context);
vm.runInContext(fs.readFileSync(__dirname+'/app.js','utf8'),context);
const results=vm.runInContext('runChecks()',context);
for(const result of results) console.log((result.ok?'PASS':'FAIL')+' '+result.name);
console.log(results.filter(result=>result.ok).length+'/'+results.length+' passed');
if(results.some(result=>!result.ok))process.exitCode=1;
