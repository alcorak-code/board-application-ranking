import { prisma } from "~/src/db/prisma";
import { notFound } from "next/navigation";
import { Proposition } from "~/src/components/proposition/PropositionLine";

export default async function BoardPage({
    params,
}: {
    params: { boardId: string };
}) {
    const boardId = Number(params.boardId);

    const propositions = await prisma.proposition.findMany({
        where: {
            boardId: boardId
        },
        select: {
            id: true,
            title: true,
            ip:true,
            _count: {
                select: {
                    vote: true
                }
            }
        }
    })

    return <ul className="flex flex-col gap-4">
        {propositions.map(proposition => (
            <Proposition key={proposition.id}
                voteCount={proposition._count.vote}
                {...proposition}
            />
        ))}
    </ul>;
}