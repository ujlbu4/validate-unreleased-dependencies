var expect = require("chai").expect;
var helper = require("../src/helper");

describe("isReleasedVersion tests", function () {
    describe("positive cases", function () {
        let package_versions = [
            {
                "input": { "version": "1.2.3", "package_name": "YouLTD.Common.Interface" },
                "expected": { "result": true, "failed_deps": {} }
            },
            {
                "input": { "version": "1.2.3", "package_name": "System.Xml.XDocument" },
                "expected": { "result": true, "failed_deps": {} }
            }
        ]
        package_versions.forEach(element => {
            var input = element.input;
            var expected = element.expected;
            it(`case: version=${input.version}, package_name=${input.package_name}`, function () {
                var failed_deps = {};

                var result = helper.isReleasedVersion(input.version, failed_deps, input.package_name);

                expect(result).is.equal(expected.result);
                expect(failed_deps).is.deep.equal(expected.failed_deps);
            })
        });
    });

    describe("negative cases", function () {
        let package_versions = [
            {
                "input": { "version": "xxx", "package_name": "yourltd" },
                "expected": { "result": false, "failed_deps": { "yourltd": "xxx" } }
            },
            {
                "input": { "version": "1.2", "package_name": "yourltd" },
                "expected": { "result": false, "failed_deps": { "yourltd": "1.2" } }
            },
            {
                "input": { "version": "1.2.3-xxx", "package_name": "yourltd" },
                "expected": { "result": false, "failed_deps": { "yourltd": "1.2.3-xxx" } }
            },
            {
                "input": { "version": "1.2.3.4", "package_name": "yourltd" },
                "expected": { "result": false, "failed_deps": { "yourltd": "1.2.3.4" } }
            },
            {
                "input": { "version": "3.39.0.423-fix-consolidate-ss-version", "package_name": "yourltd" },
                "expected": { "result": false, "failed_deps": { "yourltd": "3.39.0.423-fix-consolidate-ss-version" } }
            },
        ]
        package_versions.forEach(element => {
            var input = element.input;
            var expected = element.expected;
            it(`case: version=${input.version}, package_name=${input.package_name}`, function () {
                var failed_deps = {};

                var result = helper.isReleasedVersion(input.version, failed_deps, input.package_name);

                expect(result).is.equal(expected.result);
                expect(failed_deps).is.deep.equal(expected.failed_deps);
            })
        });
    });
});

describe("extractDependenciesVersion tests", function () {
    describe("positive cases", function () {
        it("extract resolved package versions", function () {
            let filename = process.cwd() + "/test/fixtures/example-positive-lock.json";
            var extracted_deps = helper.extractDependenciesVersion(filename);

            var expected_deps = {
                "YouLTD.Common.Core": "3.39.0.423-fix-consolidate-ss-version",
                "YouLTD.Common.Interface": "3.39.0",
                "System.Xml.XmlDocument": "4.3.0"
            }
            expect(extracted_deps).is.deep.equal(expected_deps)
            expect(extracted_deps).to.not.have.any.keys(
                "youltd.servicemodel", // no resolved field
            )
        });

        it("accept absolute input path", function () {
            let filename = process.cwd() + "/test/fixtures/example-positive-lock.json";
            var extracted_deps = helper.extractDependenciesVersion(filename);

            expect(extracted_deps).has.any.key("YourLTD.Common.Core")
        });

        it("accept relative input path", function () {
            //let filename = process.cwd() + "/test/fixtures/example-positive-lock.json";
            let filename = "./test/fixtures/example-positive-lock.json"
            var extracted_deps = helper.extractDependenciesVersion(filename);

            expect(extracted_deps).has.any.key("YourLTD.Common.Core")
        });
    });

    describe("negative cases", function () {
        it("no file exist", function () {
            let filename = "not-exist-path/example-lock.json";
            var extracted_deps = helper.extractDependenciesVersion(filename);

            expect(extracted_deps).is.empty;
        });

        it.skip("is broken file", function () {
            let filename = process.cwd() + "/test/fixtures/broken-lock.json";
            var extracted_deps = helper.extractDependenciesVersion(filename);

            expect(false).is.true // todo: implement it
        });
    });
});


describe("analyseResult tests", function() {
    describe("positive cases", function() {
        let cases = [
            // {
            //     "input": { "failed_deps": {} },
            //     "expected": { "result": 0 }
            // },
            // {
            //     "input": { "failed_deps": {"package1": "1.2.3-xxx"} },
            //     "expected": { "result": 1 }
            // },
            {
                "input": { "failed_deps": {"package1": "1.2.3-xxx", "package2": "yyy"} },
                "expected": { "result": 2 }
            },
        ]
        cases.forEach(element => {
            var input = element.input;
            var expected = element.expected;
            it(`case: deps=${JSON.stringify(input.failed_deps)}`, function () {
                var failed_deps = input.failed_deps;

                var result = helper.analyseResult("somefile.tmp", failed_deps);

                expect(result).is.equal(expected.result);
            })
        });
    });

});