Validate dotnet "packages.lock.json" to not include unreleased dependencies 

Look at current folder dotnet lock files ("packages.lock.json" by default), parse it, print to stdout 
list of packages with pre-released or unappropriate by semver versions.

For example we have next packages.lock.json:
```json
{
  "version": 1,
  "dependencies": {
    ".NETCoreApp,Version=v2.2": {
      "YourLTD.Common.Core": {
        "type": "Direct",
        "requested": "[3.39.0.423-fix-consolidate-ss-version, )",
        "resolved": "3.39.0.423-fix-consolidate-ss-version",
        "contentHash": "TErzDeNAJ7hA0GbgB63J6VTm0/NyPl84dvU29vlg==",
        "dependencies": {
          "AWSSDK.S3": "3.3.31.24",
          "AutoMapper": "8.0.0"
        }
      },
      "yourltd.servicemodel": {
        "type": "Project",
        "dependencies": {
          "YourLTD.Credentials": "3.36.0",
          "ServiceStack": "5.5.0",
          "ServiceStack.Interfaces": "5.5.0"
        }
      },
      "System.Xml.XmlDocument": {
        "type": "Transitive",
        "resolved": "4.3.0",
        "contentHash": "lJ8AxvkX7GQxpC6GFCeB+f/cWHJU8tjS7YfI6Cv6bon70jVEgs2CiFbmmM8b9j1oZVx0dSI2Ww==",
        "dependencies": {
          "System.Xml.ReaderWriter": "4.3.0"
        }
      }
    }
  }
}
```

Util will find and output: 
```
YourLTD.Common.Core: 3.39.0.423-fix-consolidate-ss-version
```

At the current moment it hardcoded analyze only `yourltd` packages, but it possible to put this on input param.


Example local-run analize lock file at supaservice project :
```
$ node src/main.js -d /Users/ujlbu4/Work/yourltd/supaservice
```

Run as installed package:
```
$ cd validate-unreleased-dependencies
$ npm install -g .

# run as cli
$ validate-unreleased-dependencies -d /Users/ujlbu4/Work/yourltd/microservices/erp
```