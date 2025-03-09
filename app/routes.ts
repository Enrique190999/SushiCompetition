import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("create/:id","routes/create.tsx"),
    route("ingame/:id/:username","routes/ingame.tsx")
] satisfies RouteConfig;
