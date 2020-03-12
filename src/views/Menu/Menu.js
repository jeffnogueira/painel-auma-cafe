// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
// core components/views for Admin layout
import Home from "views/Home/Home.jsx";
import Bag from "views/Bag/index.jsx";
import Location from "views/Location/index.jsx";
import User from "views/User/index.jsx";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: Dashboard,
    component: Home,
    layout: "/admin"
  },
  {
    path: "/bag",
    name: "Sacas de Café",
    icon: FormatListBulleted,
    component: Bag,
    layout: "/admin"
  },
  {
    path: "/location",
    name: "Localizações",
    icon: LocationOn,
    component: Location,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Usuários",
    icon: Person,
    component: User,
    layout: "/admin"
  },
];

export default dashboardRoutes;
