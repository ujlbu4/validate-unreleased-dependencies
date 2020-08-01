const semver = require('semver')

semver.valid('1.2.3') // '1.2.3'
semver.valid('a.b.c') // null
semver.clean('  =v1.2.3   ') // '1.2.3'


console.log(semver.valid('1.2.3'));

console.log(semver.prerelease('4.5.6'))
console.log(semver.prerelease('4.5.6-pre'))
console.log(semver.prerelease('4.5.6-123-xxx'))
console.log(semver.prerelease('3.39.0.423-xxx1'))
console.log(semver.prerelease("1.0.4-global-vars.32643.0"))

console.log(semver.valid('3.39.0.423-x'))

console.log("\n====\n")
const path = require('path');

console.log(path.isAbsolute('./artifacts'))
console.log(path.isAbsolute('/tmp'))
console.log(path.isAbsolute('xxx'))