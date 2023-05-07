import { prisma } from "~/src/db/prisma";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";

const QuerySheme = z.object({
  propositionId: z.string().transform((id) => Number(id)),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const query = QuerySheme.parse(req.query);

  const proposition = await prisma.vote.create({
    data: {
      propositionId: query.propositionId,
      ip: "127.0.0.2",
    },
  });

  res.status(201).json({ proposition });
}
