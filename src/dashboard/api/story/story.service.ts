import { Prisma } from "@prisma/client";
import { db } from "../../../_shared/config/prisma";

export const updateStoryStatusService = async (ctx: any) => {
  const { storyId } = ctx.params;
  const { status } = ctx.request.body;

  if (!storyId || !status) {
    ctx.throw(400, "Story ID and new status are required.");
  }

  const updatedStory = await db.story.update({
    where: { id: storyId },
    data: { status: status.toUpperCase() }, // "PENDING", "APPROVED", "REJECTED"
  });

  return updatedStory;
};

export const getAllStoriesService = async (ctx: any) => {
  const { page = 1, pageSize = 10, category, search } = ctx.query;

  const pageNumber = Number(page);
  const limit = Number(pageSize);
  const skip = (pageNumber - 1) * limit;

  const filters: Prisma.StoryWhereInput = {};

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
    db.story.count({ where: filters }),
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
