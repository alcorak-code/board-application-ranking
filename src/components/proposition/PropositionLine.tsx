"use client";
import { useRouter } from "next/navigation";
import { UpVote } from "./UpVote";
import { Button } from "../form/Bouton";

type PropositionLineProps = {
  title: string;
  id: number;
  voteCount: number;
  ip: string;
};

export const Proposition = ({
  title,
  id,
  voteCount,
  ip,
}: PropositionLineProps) => {
  const router = useRouter();

  const handleDelete = () => {
    fetch(`/api/propositions/${id}/delete`, {
      method: "POST",
    }).then((res) => {
      if (res.status === 201) {
        router.refresh();
        return;
      }
    });
  };

  return (
    <div className="p-6 flex justify-between items-center rounded-lg shadow bg-gray-800 border-gray-700 gap-2 w-full">
      <h5 className="text-2xl font-bold tracking-tight text-white">{title}</h5>
      <UpVote voteCount={voteCount} propositionId={id} />
      <Button onClick={handleDelete}>x</Button>
    </div>
  );
};
