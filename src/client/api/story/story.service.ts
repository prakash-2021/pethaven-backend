import { db } from "../../../_shared/config/prisma";

interface StoryPayload {
  title: string;
  thumbnail: string;
  shortDescription: string;
  content: string;
  category: string;
  userId: string;
}

interface UpdateStoryPayload {
  title?: string;
  thumbnail?: string;
  shortDescription?: string;
  content?: string;
  category?: string;
}

// Create a story
export const createStoryService = async (data: StoryPayload) => {
  return await db.story.create({
    data,
  });
};

// Get all stories (optional filtering in future)
export const getAllStoriesService = async (ctx: any) => {
  const { category, search } = ctx.query;

  const filters: any = {};

  if (category) {
    filters.category = category.toUpperCase(); // "INSPIRATIONAL" | "LOST"
  }

  if (search) {
    filters.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { shortDescription: { contains: search, mode: "insensitive" } },
    ];
  }

  const stories = await db.story.findMany({
    where: filters,
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
};

// Get story by ID
export const getStoryByIdService = async (storyId: string) => {
  return await db.story.findUnique({
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
};

// Update story
export const updateStoryService = async (
  storyId: string,
  data: UpdateStoryPayload
) => {
  return await db.story.update({
    where: { id: storyId },
    data,
  });
};

// Delete story
export const deleteStoryService = async (storyId: string) => {
  return await db.story.delete({
    where: { id: storyId },
  });
};

// services/story.service.ts

export const getStoriesByUserService = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const stories = await db.story.findMany({
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
};
