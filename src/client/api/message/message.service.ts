import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MessagePayload {
  senderId: string;
  receiverId: string;
  senderRole: "admin" | "user";
  receiverRole: "admin" | "user";
  content: string;
}

export const handleSocketMessage = async (
  raw: string,
  senderKey: string,
  clients: Map<string, any>
) => {
  const data: MessagePayload = JSON.parse(raw);

  const message = await prisma.message.create({
    data: {
      content: data.content,
      senderUserId: data.senderRole === "user" ? data.senderId : undefined,
      senderAdminId: data.senderRole === "admin" ? data.senderId : undefined,
      receiverUserId:
        data.receiverRole === "user" ? data.receiverId : undefined,
      receiverAdminId:
        data.receiverRole === "admin" ? data.receiverId : undefined,
    },
  });

  const receiverKey = `${data.receiverRole}:${data.receiverId}`;
  const receiver = clients.get(receiverKey);
  if (receiver) {
    receiver.ws.send(
      JSON.stringify({
        type: "NEW_MESSAGE",
        payload: message,
      })
    );
  }
};

export const getChatMessages = async (
  id1: string,
  id2: string,
  requesterRole: "admin" | "user"
) => {
  return await prisma.message.findMany({
    where: {
      OR: [
        {
          senderUserId: requesterRole === "user" ? id1 : id2,
          receiverAdminId: requesterRole === "user" ? id2 : id1,
        },
        {
          senderAdminId: requesterRole === "admin" ? id1 : id2,
          receiverUserId: requesterRole === "admin" ? id2 : id1,
        },
      ],
    },
    orderBy: { createdAt: "asc" },
  });
};
