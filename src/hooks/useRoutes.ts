"use client"

import { useAtom } from "jotai"
import { routes } from "../types"
import { LumeRoute } from "../storage/atom";

const useRoutes = () => {

  const [route, setRoute] = useAtom(LumeRoute);

  const changeRoute = (r: routes) => {
    if(r === route) return;
    setRoute(r);
  }

  const activeRoute = () => {
    return route;
  }

  return {
    changeRoute,
    activeRoute
  }
}


export default useRoutes;
