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
exports.updateApplicationStatusService = exports.getAllApplicationsService = void 0;
const prisma_1 = require("../../../_shared/config/prisma");
const sendApplicationEmail_1 = require("../../../utils/sendApplicationEmail");
const getAllApplicationsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.adoptionApplication.findMany({
        include: {
            user: true,
            pet: true,
        },
        orderBy: {
            submittedAt: "desc",
        },
    });
});
exports.getAllApplicationsService = getAllApplicationsService;
const updateApplicationStatusService = (applicationId, email, petName, status) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendApplicationEmail_1.sendApplicationEmail)(email, petName, status);
    return yield prisma_1.db.adoptionApplication.update({
        where: { applicationId },
        data: { status },
    });
});
exports.updateApplicationStatusService = updateApplicationStatusService;
