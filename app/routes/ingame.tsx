import type { Route } from "../+types/root";
import { useParams } from "react-router";
import InGamePage from "~/pages/InGamePage";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "In game" },
    { name: "description", content: "In game" },
  ];
}

export default function Create() {

  const { id, username } = useParams();
  
  return <InGamePage gameId={id ?? ""} username={username ?? ""}/>;
}
