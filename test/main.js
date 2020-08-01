
var expect = require("chai").expect;
// var main = require("../src/main");
const { spawnSync } = require('child_process');

describe("acceptance tests (e2e)", function () {
    describe("positive case", function () {
        it("successfull detect unreleased versions", function () {
            const main = spawnSync('node', [
                process.cwd() + '/src/main.js',
                '--directory', process.cwd() + '/test/fixtures/',
                '--name-lock-file', 'example-positive-lock.json'
            ])
            expect(main.status).is.equal(1)
            // console.log(main.output.toString())
        })

        it("pass when no unreleased versions", function () {
            const main = spawnSync('node', [
                process.cwd() + '/src/main.js',
                '--directory', process.cwd() + '/test/fixtures/',
                '--name-lock-file', 'no-unreleased-lock.json'
            ])
            expect(main.status).is.equal(0)
        })
    });

    describe("negative case", function () {
        it("failed when no lock files found", function () {
            const main = spawnSync('node', [
                process.cwd() + '/src/main.js',
                '--directory', 'unexist-folder/'
            ])
            expect(main.status).is.equal(1)
        })
    });
})