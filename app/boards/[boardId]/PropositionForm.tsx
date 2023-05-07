"use client";
import { Input } from "~/src/components/form/Input";
import { Button } from "~/src/components/form/Bouton";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

type PropositionBoardProps = {
    boardId : number
}

export default function PropositionForm({
    boardId
}: PropositionBoardProps) {
    const router = useRouter();

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget)
        const title = String(formData.get('title'))

        fetch(`/api/boards/${boardId}/proposition`, {
            method:'POST',
            body: JSON.stringify({
                title
            })
        })
        .then((res) => res.json())
        .then((data) => {
            router.refresh();
        });
    }

    return <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input label="Title" name="title"/>
      <Button type="submit">Create Proposition</Button>    
    </form>;
}