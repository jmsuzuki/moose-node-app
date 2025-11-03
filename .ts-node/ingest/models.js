"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarPipeline = exports.FooPipeline = void 0;
var __typia_transform__validateReport = __importStar(require("typia/lib/internal/_validateReport.js"));
var __typia_transform__createStandardSchema = __importStar(require("typia/lib/internal/_createStandardSchema.js"));
var __typia_transform__assertGuard = __importStar(require("typia/lib/internal/_assertGuard.js"));
var typia_1 = __importDefault(require("typia"));
var moose_lib_1 = require("@514labs/moose-lib");
/** =======Pipeline Configuration========= */
/** Raw data ingestion */
exports.FooPipeline = new moose_lib_1.IngestPipeline("Foo", {
    path: "pipelines/foo", // TODO: Enable when using npm release with path support
    table: true, // No table; only stream raw records
    stream: true, // Buffer ingested records
    ingest: true, // POST /ingest/Foo
}, {
    version: "3.1",
    components: {
        schemas: {
            Foo: {
                type: "object",
                properties: {
                    primaryKey: {
                        type: "string"
                    },
                    timestamp: {
                        type: "number"
                    },
                    optionalText: {
                        type: "string"
                    }
                },
                required: [
                    "primaryKey",
                    "timestamp"
                ],
                description: "Raw data ingested via API"
            }
        }
    },
    schemas: [
        {
            $ref: "#/components/schemas/Foo"
        }
    ]
}, JSON.parse("[{\"name\":\"primaryKey\",\"data_type\":\"String\",\"primary_key\":true,\"required\":true,\"unique\":false,\"default\":null,\"annotations\":[]},{\"name\":\"timestamp\",\"data_type\":\"Float\",\"primary_key\":false,\"required\":true,\"unique\":false,\"default\":null,\"annotations\":[]},{\"name\":\"optionalText\",\"data_type\":\"String\",\"primary_key\":false,\"required\":false,\"unique\":false,\"default\":null,\"annotations\":[]}]"), {
    validate: function (data) {
        var result = (function () { var _io0 = function (input) { return "string" === typeof input.primaryKey && "number" === typeof input.timestamp && (undefined === input.optionalText || "string" === typeof input.optionalText); }; var _vo0 = function (input, _path, _exceptionable) {
            if (_exceptionable === void 0) { _exceptionable = true; }
            return ["string" === typeof input.primaryKey || _report(_exceptionable, {
                    path: _path + ".primaryKey",
                    expected: "string",
                    value: input.primaryKey
                }), "number" === typeof input.timestamp || _report(_exceptionable, {
                    path: _path + ".timestamp",
                    expected: "number",
                    value: input.timestamp
                }), undefined === input.optionalText || "string" === typeof input.optionalText || _report(_exceptionable, {
                    path: _path + ".optionalText",
                    expected: "(string | undefined)",
                    value: input.optionalText
                })].every(function (flag) { return flag; });
        }; var __is = function (input) { return "object" === typeof input && null !== input && _io0(input); }; var errors; var _report; return __typia_transform__createStandardSchema._createStandardSchema(function (input) {
            if (false === __is(input)) {
                errors = [];
                _report = __typia_transform__validateReport._validateReport(errors);
                (function (input, _path, _exceptionable) {
                    if (_exceptionable === void 0) { _exceptionable = true; }
                    return ("object" === typeof input && null !== input || _report(true, {
                        path: _path + "",
                        expected: "Foo",
                        value: input
                    })) && _vo0(input, _path + "", true) || _report(true, {
                        path: _path + "",
                        expected: "Foo",
                        value: input
                    });
                })(input, "$input", true);
                var success = 0 === errors.length;
                return success ? {
                    success: success,
                    data: input
                } : {
                    success: success,
                    errors: errors,
                    data: input
                };
            }
            return {
                success: true,
                data: input
            };
        }); })()(data);
        return {
            success: result.success,
            data: result.success ? result.data : undefined,
            errors: result.success ? undefined : result.errors
        };
    },
    assert: (function () { var _io0 = function (input) { return "string" === typeof input.primaryKey && "number" === typeof input.timestamp && (undefined === input.optionalText || "string" === typeof input.optionalText); }; var _ao0 = function (input, _path, _exceptionable) {
        if (_exceptionable === void 0) { _exceptionable = true; }
        return ("string" === typeof input.primaryKey || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "____moose____typia.createAssert",
            path: _path + ".primaryKey",
            expected: "string",
            value: input.primaryKey
        }, _errorFactory)) && ("number" === typeof input.timestamp || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "____moose____typia.createAssert",
            path: _path + ".timestamp",
            expected: "number",
            value: input.timestamp
        }, _errorFactory)) && (undefined === input.optionalText || "string" === typeof input.optionalText || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "____moose____typia.createAssert",
            path: _path + ".optionalText",
            expected: "(string | undefined)",
            value: input.optionalText
        }, _errorFactory));
    }; var __is = function (input) { return "object" === typeof input && null !== input && _io0(input); }; var _errorFactory; return function (input, errorFactory) {
        if (false === __is(input)) {
            _errorFactory = errorFactory;
            (function (input, _path, _exceptionable) {
                if (_exceptionable === void 0) { _exceptionable = true; }
                return ("object" === typeof input && null !== input || __typia_transform__assertGuard._assertGuard(true, {
                    method: "____moose____typia.createAssert",
                    path: _path + "",
                    expected: "Foo",
                    value: input
                }, _errorFactory)) && _ao0(input, _path + "", true) || __typia_transform__assertGuard._assertGuard(true, {
                    method: "____moose____typia.createAssert",
                    path: _path + "",
                    expected: "Foo",
                    value: input
                }, _errorFactory);
            })(input, "$input", true);
        }
        return input;
    }; })(),
    is: (function () { var _io0 = function (input) { return "string" === typeof input.primaryKey && "number" === typeof input.timestamp && (undefined === input.optionalText || "string" === typeof input.optionalText); }; return function (input) { return "object" === typeof input && null !== input && _io0(input); }; })()
});
/** Buffering and storing processed records (@see transforms.ts for transformation logic) */
exports.BarPipeline = new moose_lib_1.IngestPipeline("Bar", {
    // path: "pipelines/bar", // TODO: Enable when using npm release with path support
    table: true, // Persist in ClickHouse table "Bar"
    stream: true, // Buffer processed records
    ingest: false, // No direct ingestion, derived from Foo
}, {
    version: "3.1",
    components: {
        schemas: {
            Bar: {
                type: "object",
                properties: {
                    primaryKey: {
                        type: "string"
                    },
                    utcTimestamp: {
                        type: "string",
                        format: "date-time"
                    },
                    hasText: {
                        type: "boolean"
                    },
                    textLength: {
                        type: "number"
                    }
                },
                required: [
                    "primaryKey",
                    "utcTimestamp",
                    "hasText",
                    "textLength"
                ],
                description: "Analyzed text metrics derived from Foo"
            }
        }
    },
    schemas: [
        {
            $ref: "#/components/schemas/Bar"
        }
    ]
}, JSON.parse("[{\"name\":\"primaryKey\",\"data_type\":\"String\",\"primary_key\":true,\"required\":true,\"unique\":false,\"default\":null,\"annotations\":[]},{\"name\":\"utcTimestamp\",\"data_type\":\"DateTime\",\"primary_key\":false,\"required\":true,\"unique\":false,\"default\":null,\"annotations\":[]},{\"name\":\"hasText\",\"data_type\":\"Boolean\",\"primary_key\":false,\"required\":true,\"unique\":false,\"default\":null,\"annotations\":[]},{\"name\":\"textLength\",\"data_type\":\"Float\",\"primary_key\":false,\"required\":true,\"unique\":false,\"default\":null,\"annotations\":[]}]"), {
    validate: function (data) {
        var result = (function () { var _io0 = function (input) { return "string" === typeof input.primaryKey && input.utcTimestamp instanceof Date && "boolean" === typeof input.hasText && "number" === typeof input.textLength; }; var _vo0 = function (input, _path, _exceptionable) {
            if (_exceptionable === void 0) { _exceptionable = true; }
            return ["string" === typeof input.primaryKey || _report(_exceptionable, {
                    path: _path + ".primaryKey",
                    expected: "string",
                    value: input.primaryKey
                }), input.utcTimestamp instanceof Date || _report(_exceptionable, {
                    path: _path + ".utcTimestamp",
                    expected: "Date",
                    value: input.utcTimestamp
                }), "boolean" === typeof input.hasText || _report(_exceptionable, {
                    path: _path + ".hasText",
                    expected: "boolean",
                    value: input.hasText
                }), "number" === typeof input.textLength || _report(_exceptionable, {
                    path: _path + ".textLength",
                    expected: "number",
                    value: input.textLength
                })].every(function (flag) { return flag; });
        }; var __is = function (input) { return "object" === typeof input && null !== input && _io0(input); }; var errors; var _report; return __typia_transform__createStandardSchema._createStandardSchema(function (input) {
            if (false === __is(input)) {
                errors = [];
                _report = __typia_transform__validateReport._validateReport(errors);
                (function (input, _path, _exceptionable) {
                    if (_exceptionable === void 0) { _exceptionable = true; }
                    return ("object" === typeof input && null !== input || _report(true, {
                        path: _path + "",
                        expected: "Bar",
                        value: input
                    })) && _vo0(input, _path + "", true) || _report(true, {
                        path: _path + "",
                        expected: "Bar",
                        value: input
                    });
                })(input, "$input", true);
                var success = 0 === errors.length;
                return success ? {
                    success: success,
                    data: input
                } : {
                    success: success,
                    errors: errors,
                    data: input
                };
            }
            return {
                success: true,
                data: input
            };
        }); })()(data);
        return {
            success: result.success,
            data: result.success ? result.data : undefined,
            errors: result.success ? undefined : result.errors
        };
    },
    assert: (function () { var _io0 = function (input) { return "string" === typeof input.primaryKey && input.utcTimestamp instanceof Date && "boolean" === typeof input.hasText && "number" === typeof input.textLength; }; var _ao0 = function (input, _path, _exceptionable) {
        if (_exceptionable === void 0) { _exceptionable = true; }
        return ("string" === typeof input.primaryKey || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "____moose____typia.createAssert",
            path: _path + ".primaryKey",
            expected: "string",
            value: input.primaryKey
        }, _errorFactory)) && (input.utcTimestamp instanceof Date || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "____moose____typia.createAssert",
            path: _path + ".utcTimestamp",
            expected: "Date",
            value: input.utcTimestamp
        }, _errorFactory)) && ("boolean" === typeof input.hasText || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "____moose____typia.createAssert",
            path: _path + ".hasText",
            expected: "boolean",
            value: input.hasText
        }, _errorFactory)) && ("number" === typeof input.textLength || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "____moose____typia.createAssert",
            path: _path + ".textLength",
            expected: "number",
            value: input.textLength
        }, _errorFactory));
    }; var __is = function (input) { return "object" === typeof input && null !== input && _io0(input); }; var _errorFactory; return function (input, errorFactory) {
        if (false === __is(input)) {
            _errorFactory = errorFactory;
            (function (input, _path, _exceptionable) {
                if (_exceptionable === void 0) { _exceptionable = true; }
                return ("object" === typeof input && null !== input || __typia_transform__assertGuard._assertGuard(true, {
                    method: "____moose____typia.createAssert",
                    path: _path + "",
                    expected: "Bar",
                    value: input
                }, _errorFactory)) && _ao0(input, _path + "", true) || __typia_transform__assertGuard._assertGuard(true, {
                    method: "____moose____typia.createAssert",
                    path: _path + "",
                    expected: "Bar",
                    value: input
                }, _errorFactory);
            })(input, "$input", true);
        }
        return input;
    }; })(),
    is: (function () { var _io0 = function (input) { return "string" === typeof input.primaryKey && input.utcTimestamp instanceof Date && "boolean" === typeof input.hasText && "number" === typeof input.textLength; }; return function (input) { return "object" === typeof input && null !== input && _io0(input); }; })()
});
//# sourceMappingURL=models.js.map