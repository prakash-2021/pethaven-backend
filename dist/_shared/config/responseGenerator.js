"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseGenerator = void 0;
const responseGenerator = (data, meta) => {
    return { data, meta: meta ? meta : undefined };
};
exports.responseGenerator = responseGenerator;
