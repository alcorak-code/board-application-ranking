import BoardForm from "./BoardForm";

export default function NewBoardPage() {
    return <div className="flex flex-col gap-10">
        <h2 className="text-2xl">Create new board</h2>
        <BoardForm></BoardForm>
    </div>;
}