import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { prisma } from "~/src/db/prisma";
import PropositionForm from "./PropositionForm";

type Props = PropsWithChildren<{
    params: { boardId: string };
}>

export default async function LayoutBoard(props: Props) {
    const boardId = Number(props.params.boardId);
    
    if (isNaN(boardId)) {
        return notFound()
    }

    const board = await prisma.board.findUniqueOrThrow({
        where:{
            id:boardId
        }
    })

    // throw new Error ("Something went wrong !");
    return <div className="flex flex-col gap-6">
        <h2 className="text-4xl font-bold">{board.title}</h2>
        {props.children}
        <PropositionForm boardId={board.id}/>
    </div>;
}
