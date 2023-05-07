import { Proposition } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/src/db/prisma";

type Data = {
  proposition: Proposition;
};

const BodyScheme = z.object({
  title: z.string().min(1).max(255),
});
const QuerySheme = z.object({
  boardId: z.string().transform((id) => Number(id)),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const body = BodyScheme.parse(JSON.parse(req.body));
  const query = QuerySheme.parse(req.query);

  const proposition = await prisma.proposition.create({
    data: {
      boardId: query.boardId,
      title: body.title,
      ip:req.socket.remoteAddress??'0.0.0.0',
    },
  });

  res.status(201).json({ proposition });
}
