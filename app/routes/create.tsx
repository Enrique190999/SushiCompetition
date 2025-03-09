import CreateGamePage from "~/pages/CreateGamePage";
import type { Route } from "../+types/root";
import { useParams } from "react-router";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Create a Game" },
    { name: "description", content: "Create a new game session" },
  ];
}

export default function Create() {

  const { id } = useParams();
  return <CreateGamePage gameId={id} />;
}
