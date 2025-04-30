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
exports.getDashboardStats = void 0;
const prisma_1 = require("../../../_shared/config/prisma");
const getDashboardStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield prisma_1.db.user.count();
    const totalPets = yield prisma_1.db.pet.count();
    const totalAdoptedPets = yield prisma_1.db.pet.count({
        where: {
            adoptionStatus: "ADOPTED",
        },
    });
    const totalStories = yield prisma_1.db.story.count();
    const totalStrayDogReports = yield prisma_1.db.strayDogReport.count();
    return {
        totalUsers,
        totalPets,
        totalAdoptedPets,
        totalStories,
        totalStrayDogReports,
    };
});
exports.getDashboardStats = getDashboardStats;
