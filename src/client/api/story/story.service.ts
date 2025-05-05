import { db } from "../../../_shared/config/prisma";

interface StoryPayload {
  title: string;
  thumbnail: string;
  shortDescription: string;
  content: string;
  category: string;
  userId: string;
  status: string;
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
    data: {
      ...data,
      status: "PENDING",
    },
  });
};

// Get all stories (optional filtering in future)
export const getAllStoriesService = async (ctx: any) => {
  const { page = 1, pageSize = 10, category, search } = ctx.query;

  const pageNumber = Number(page);
  const limit = Number(pageSize);
  const skip = (pageNumber - 1) * limit;

  const filters: any = {};

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

  const [stories, totalStories] = await db.$transaction([
    db.story.findMany({
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
    db.story.count({
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
          image: true,
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
