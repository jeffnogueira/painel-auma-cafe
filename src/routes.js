// core components/views for Admin layout
import Home from "views/Home/Home.jsx";

import Bag from "views/Bag/index.jsx";
import addBag from "views/Bag/add.jsx";
import editBag from "views/Bag/edit.jsx";
import viewBag from "views/Bag/view.jsx";
import qrCode from "views/Bag/qrCode.jsx";

import Login from "views/Login/Login.jsx";

import User from "views/User/index.jsx";
import addUser from "views/User/add.jsx";
import editUser from "views/User/edit.jsx";

import Location from "views/Location/index.jsx";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    layout: "/admin"
  },
  {
    path: "/bag",
    name: "Sacas de Café",
    component: Bag,
    layout: "/admin"
  },
  {
    path: "/addBag",
    name: "Cadastrar Saca de Café",
    component: addBag,
    layout: "/admin"
  },
  {
    path: "/editBag/:id",
    name: "Editar Saca de Café",
    component: editBag,
    layout: "/admin"
  },
  {
    path: "/viewBag/:id",
    name: "Visualizar Saca de Café",
    component: viewBag,
    layout: "/admin"
  },
  {
    path: "/qrCode/:id",
    name: "QR Code Saca de Café",
    component: qrCode,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Usuários",
    component: User,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Área de Login",
    component: Login,
    layout: "/admin"
  },
  {
    path: "/addUser",
    name: "Cadastrar Usuário",
    component: addUser,
    layout: "/admin"
  },
  {
    path: "/editUser/:id",
    name: "Editar Usuário",
    component: editUser,
    layout: "/admin"
  },
  {
    path: "/location",
    name: "Localizações",
    component: Location,
    layout: "/admin"
  },
];

export default dashboardRoutes;
