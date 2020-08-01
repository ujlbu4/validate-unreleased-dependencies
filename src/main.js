#!/usr/bin/env node

const yargs = require("yargs");


const options = yargs
 .usage("Usage: -f <dotnet solution folder>")
 .option("d", { alias: "directory", describe: ".NET solution root folder", type: "string", demandOption: true })
 .option("n", { alias: "name-lock-file", describe: "Lock file name template", type: "string", default: "packages.lock.json" })
 .argv;

 
var solution_root_path = options.d;
var lockfile_name_template = options.n;


var helper = require("./helper")

var files = helper.findFile(solution_root_path, lockfile_name_template, 
                            helper.extractDependenciesVersion)

var result = 0;

files.forEach(file => {
   //var prereleased_deps = helper.extractDependenciesVersion(file, helper.isReleasedVersion) ;
   var extracted_deps = helper.extractDependenciesVersion(file);
   var prereleased_deps = {};

   for (var package_name in extracted_deps) {
       var version = extracted_deps[package_name];
       helper.isReleasedVersion(version, prereleased_deps, package_name)
   }
   
   if (helper.analyseResult(file, prereleased_deps) > 0) {
       result = 1;
   }
});

process.exit(result);