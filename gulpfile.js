"use strict";
const gulp = require("gulp");
const del = require("del");
const runSequence = require("run-sequence");

require("./gulp/copy")();
require("./gulp/jade")();
require("./gulp/stylus")();
require("./gulp/test")();
require("./gulp/ts")();

gulp.task("default", ["build", "serve:init", "watch"]);

gulp.task("build", ["clean"], callback => {
    runSequence("copy:copy", "jade:build", "stylus:build", "ts", callback);
});

gulp.task("release-build", ["clean"], callback => {
    runSequence("copy:copy", "jade:release", "stylus:release", "ts:release", callback);
});

gulp.task("clean", () => {
    return del("lib/");
});

gulp.task("ts", callback => {
    runSequence("ts:build", "test", callback);
});

gulp.task("watch", () => {
    gulp.watch(["src/**/*", "!**/tsconfig.json", "!**/*.*(jade|stylus|ts|tsx)"], ["copy:copy"]);
    gulp.watch(["src/**/*.ts", "!src/test/"], ["ts"]);
    gulp.watch("src/**/*.jade", ["jade:build"]);
    gulp.watch("src/**/*.stylus", ["stylus:build"]);
    gulp.watch("src/test/**/*.ts", ["test"]);
    gulp.watch("lib/**/*", ["serve:reload"]);
});
