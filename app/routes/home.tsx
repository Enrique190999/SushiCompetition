import HomePage from "~/pages/HomePage";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sushi Competition" },
    { name: "description", content: "Sushi Competition" },
  ];
}

export default function Home() {
  return <HomePage/>;
}
