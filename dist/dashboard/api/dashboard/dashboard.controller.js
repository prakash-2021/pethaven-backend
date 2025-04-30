"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const responseGenerator_1 = require("../../../_shared/config/responseGenerator");
const dashbaord_service_1 = require("./dashbaord.service");
exports.dashboardController = {
    getStats(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const stats = yield (0, dashbaord_service_1.getDashboardStats)();
            ctx.body = (0, responseGenerator_1.responseGenerator)({
                message: "Dashboard stats fetched successfully",
                data: stats,
            });
        });
    },
};
