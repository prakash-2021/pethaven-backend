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
exports.updateApplicationStatus = exports.getAllApplications = exports.createApplication = void 0;
const application_service_1 = require("./application.service");
const createApplication = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const data = ctx.request.body;
    const application = yield (0, application_service_1.createApplicationService)(data);
    ctx.body = application;
});
exports.createApplication = createApplication;
const getAllApplications = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const applications = yield (0, application_service_1.getAllApplicationsService)();
    ctx.body = applications;
});
exports.getAllApplications = getAllApplications;
const updateApplicationStatus = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { applicationId } = ctx.params;
    const { status } = ctx.request.body;
    const updated = yield (0, application_service_1.updateApplicationStatusService)(applicationId, status);
    ctx.body = updated;
});
exports.updateApplicationStatus = updateApplicationStatus;
