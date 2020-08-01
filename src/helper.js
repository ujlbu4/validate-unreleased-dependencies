
var path = require('path'), fs=require('fs');    

function findFile(rootDir, filename_template){
    if (!fs.existsSync(rootDir)){
        console.log("There is no such dir: ", rootDir);
        return;
    }

    var files=fs.readdirSync(rootDir);
    var desired_files = [];
    for(var i=0;i<files.length;i++){
        var filename=path.join(rootDir,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            var found_files = findFile(filename,filename_template); //recurse
            if (found_files !== null && found_files.length > 0) {
                desired_files = desired_files.concat(found_files);
            }
        }
        // else if (filter.test(filename)) callback(filename); // for regexp matching
        else if (filename.includes(filename_template)) desired_files.push(filename);
    };
    return desired_files;
};

function isReleasedVersion(version, failed_deps, package_name) {            
    const semver = require('semver');

    if (!package_name.toLowerCase().includes("yourltd"))
        return true;

    if (semver.valid(version) === null || // null — is non-valid
        semver.prerelease(version) != null)  // not null - detected prerelease versions
    {
        failed_deps[package_name] = version;
        return false;
    }
    return true;
};

function extractDependenciesVersion(filename) {
    var extracted_deps = {};
    
    if (!fs.existsSync(filename)){
        console.log("There is no such file: ", filename);
        return extracted_deps;
    };

    if (!path.isAbsolute(filename)) {
        filename = process.cwd() + "/" + filename;
    }

    let j = require(filename);

    var dotNetCoreAppKey = Object.keys(j.dependencies); // ".NETCoreApp,Version=v2.2"
    var deps = j.dependencies[dotNetCoreAppKey];
    
    for (var package_name in deps) {
        var dep = deps[package_name];
        if ("resolved" in dep) extracted_deps[package_name] = dep.resolved;
    };
    return extracted_deps;
};

function analyseResult(filename, failed_deps) {
    var result = 0;  // success
    if (Object.keys(failed_deps).length !== 0) {
        console.log(`Failed (${Object.keys(failed_deps).length}): ${filename}`)
        for (k in failed_deps) {
            console.log(`\t${k}: ${failed_deps[k]}`);
        };
        result = Object.keys(failed_deps).length;
    };
    return result;
}

module.exports.findFile = findFile;
module.exports.isReleasedVersion = isReleasedVersion;
module.exports.extractDependenciesVersion = extractDependenciesVersion;
module.exports.analyseResult = analyseResult;