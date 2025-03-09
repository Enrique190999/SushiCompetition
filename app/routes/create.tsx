import CreateGamePage from "~/pages/CreateGamePage";
import type { Route } from "./+types/create";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create a Game" },
    { name: "description", content: "Create a new game session" },
  ];
}

export default function Create() {
  return <CreateGamePage />;
}
