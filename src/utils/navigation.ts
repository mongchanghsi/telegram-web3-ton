import ProfileSVG from "@/assets/icons/profile.svg";
import GameSVG from "@/assets/icons/game.svg";
import HistorySVG from "@/assets/icons/history.svg";

type INavigation = {
  id: string;
  href: string;
  label: string;
  icon: string;
};

export enum NAVIGATION_ROUTE {
  HOME = "/",
  GAME = "/game",
  HISTORY = "/history",
}

export const NAVIGATION_LABEL = {
  [NAVIGATION_ROUTE.HOME]: "Profile",
  [NAVIGATION_ROUTE.GAME]: "Game",
  [NAVIGATION_ROUTE.HISTORY]: "History",
};

const NAVIGATION: INavigation[] = [
  {
    id: NAVIGATION_LABEL[NAVIGATION_ROUTE.HOME],
    href: NAVIGATION_ROUTE.HOME,
    label: NAVIGATION_LABEL[NAVIGATION_ROUTE.HOME],
    icon: ProfileSVG,
  },
  {
    id: NAVIGATION_LABEL[NAVIGATION_ROUTE.GAME],
    href: NAVIGATION_ROUTE.GAME,
    label: NAVIGATION_LABEL[NAVIGATION_ROUTE.GAME],
    icon: GameSVG,
  },
  {
    id: NAVIGATION_LABEL[NAVIGATION_ROUTE.HISTORY],
    href: NAVIGATION_ROUTE.HISTORY,
    label: NAVIGATION_LABEL[NAVIGATION_ROUTE.HISTORY],
    icon: HistorySVG,
  },
];

export default NAVIGATION;
