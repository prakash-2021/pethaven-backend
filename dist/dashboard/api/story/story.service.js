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
exports.getAllStoriesService = exports.updateStoryStatusService = void 0;
const prisma_1 = require("../../../_shared/config/prisma");
const updateStoryStatusService = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { storyId } = ctx.params;
    const { status } = ctx.request.body;
    if (!storyId || !status) {
        ctx.throw(400, "Story ID and new status are required.");
    }
    const updatedStory = yield prisma_1.db.story.update({
        where: { id: storyId },
        data: { status: status.toUpperCase() }, // "PENDING", "APPROVED", "REJECTED"
    });
    return updatedStory;
});
exports.updateStoryStatusService = updateStoryStatusService;
const getAllStoriesService = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, pageSize = 10, category, search } = ctx.query;
    const pageNumber = Number(page);
    const limit = Number(pageSize);
    const skip = (pageNumber - 1) * limit;
    const filters = {};
    if (category) {
        filters.category = category.toUpperCase(); // e.g., "INSPIRATIONAL" or "LOST"
    }
    if (search) {
        filters.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { shortDescription: { contains: search, mode: "insensitive" } },
            {
                user: {
                    OR: [
                        { firstName: { contains: search, mode: "insensitive" } },
                        { lastName: { contains: search, mode: "insensitive" } },
                    ],
                },
            },
        ];
    }
    const [stories, totalStories] = yield prisma_1.db.$transaction([
        prisma_1.db.story.findMany({
            where: filters,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        }),
        prisma_1.db.story.count({ where: filters }),
    ]);
    return {
        stories,
        meta: {
            pageNumber,
            pageSize: limit,
            totalStories,
            totalPages: Math.ceil(totalStories / limit),
        },
    };
});
exports.getAllStoriesService = getAllStoriesService;
