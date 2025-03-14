import JoinGamePage from "~/pages/JoinGamePage";
import type { Route } from "../+types/root";
import { useParams } from "react-router";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Join game" },
    { name: "description", content: "Join game"},
  ];
}

export default function Create() {  
  return <JoinGamePage/>;
}
