"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
// Transform Foo events to Bar events
(_a = models_1.FooPipeline.stream) === null || _a === void 0 ? void 0 : _a.addTransform(models_1.BarPipeline.stream, function (foo) {
    var _a, _b;
    return ({
        primaryKey: foo.primaryKey,
        utcTimestamp: new Date(foo.timestamp * 1000), // Convert timestamp to Date
        hasText: foo.optionalText !== undefined,
        textLength: (_b = (_a = foo.optionalText) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0,
    });
});
// Add a streaming consumer to print Foo events
var printFooEvent = function (foo) {
    var _a;
    console.log("Received Foo event:");
    console.log("  Primary Key: ".concat(foo.primaryKey));
    console.log("  Timestamp: ".concat(new Date(foo.timestamp * 1000)));
    console.log("  Optional Text: ".concat((_a = foo.optionalText) !== null && _a !== void 0 ? _a : "None"));
    console.log("---");
};
(_b = models_1.FooPipeline.stream) === null || _b === void 0 ? void 0 : _b.addConsumer(printFooEvent);
//# sourceMappingURL=transforms.js.map