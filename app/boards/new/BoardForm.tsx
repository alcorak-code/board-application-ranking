"use client";
import { Input } from "~/src/components/form/Input";
import { Button } from "~/src/components/form/Bouton";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function BoardForm() {
    const router = useRouter();

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget)
        const title = String(formData.get('title'))

        fetch(`/api/boards`, {
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
      <Button type="submit">Create Board</Button>    
    </form>;
}