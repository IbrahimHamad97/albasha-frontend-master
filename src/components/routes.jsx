import Admin from "../pages/Admin";
import { Home } from "../pages/Home";
import Menu from "../pages/Menu";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/menu", element: <Menu /> },
  { path: "/admin", element: <Admin /> },
];
