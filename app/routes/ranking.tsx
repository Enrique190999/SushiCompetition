import type { Route } from "../+types/root";
import { useParams } from "react-router";
import GameStatisticsPage from "~/pages/GameStatisticsPage";
import InGamePage from "~/pages/InGamePage";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Ranking" },
    { name: "description", content: "Ranking" },
  ];
}

export default function Create() {

  const { id } = useParams();
  
  return <GameStatisticsPage idGame={id ?? ""}/>;
}
