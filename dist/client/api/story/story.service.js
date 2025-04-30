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
exports.getStoriesByUserService = exports.deleteStoryService = exports.updateStoryService = exports.getStoryByIdService = exports.getAllStoriesService = exports.createStoryService = void 0;
const prisma_1 = require("../../../_shared/config/prisma");
// Create a story
const createStoryService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.story.create({
        data: Object.assign(Object.assign({}, data), { status: "PENDING" }),
    });
});
exports.createStoryService = createStoryService;
// Get all stories (optional filtering in future)
const getAllStoriesService = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, pageSize = 10, category, search } = ctx.query;
    const pageNumber = Number(page);
    const limit = Number(pageSize);
    const skip = (pageNumber - 1) * limit;
    const filters = {};
    if (category) {
        filters.category = category; // "INSPIRATIONAL" | "LOST"
        filters.status = "APPROVED";
    }
    if (search) {
        filters.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { shortDescription: { contains: search, mode: "insensitive" } },
            { user: { firstName: { contains: search, mode: "insensitive" } } },
            { user: { lastName: { contains: search, mode: "insensitive" } } },
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
        prisma_1.db.story.count({
            where: filters,
        }),
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
// Get story by ID
const getStoryByIdService = (storyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.story.findUnique({
        where: { id: storyId },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });
});
exports.getStoryByIdService = getStoryByIdService;
// Update story
const updateStoryService = (storyId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.story.update({
        where: { id: storyId },
        data,
    });
});
exports.updateStoryService = updateStoryService;
// Delete story
const deleteStoryService = (storyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.story.delete({
        where: { id: storyId },
    });
});
exports.deleteStoryService = deleteStoryService;
// services/story.service.ts
const getStoriesByUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const stories = yield prisma_1.db.story.findMany({
        where: { userId },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return { stories };
});
exports.getStoriesByUserService = getStoriesByUserService;
