"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarPipeline = exports.FooPipeline = void 0;
var moose_lib_1 = require("@514labs/moose-lib");
/** =======Pipeline Configuration========= */
/** Raw data ingestion */
exports.FooPipeline = new moose_lib_1.IngestPipeline("Foo", {
    table: true, // No table; only stream raw records
    stream: true, // Buffer ingested records
    ingest: true, // POST /ingest/Foo
});
/** Buffering and storing processed records (@see transforms.ts for transformation logic) */
exports.BarPipeline = new moose_lib_1.IngestPipeline("Bar", {
    // path: "pipelines/bar", // TODO: Enable when using npm release with path support
    table: true, // Persist in ClickHouse table "Bar"
    stream: true, // Buffer processed records
    ingest: false, // No direct ingestion, derived from Foo
});
//# sourceMappingURL=models.js.map