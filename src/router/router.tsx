import { createBrowserRouter } from "react-router-dom";
import Login from "../pages";
import Home from "../pages/main";
import OrdemDeServiço from "../pages/main/OrdemDeServiço";
import CadastrarOrdemDeServiço from "../pages/main/OrdemDeServiço/CadastrarOrdemDeServiço";
import Agenda from "../pages/main/Agenda";
import Financeiro from "../pages/main/Financeiro";
import CadastrarFinanceiro from "../pages/main/Financeiro/CadastrarNovo";
import CadastrarCliente from "../pages/main/Clientes/CadastrarCliente";
import Clientes from "../pages/main/Clientes";

export const router = createBrowserRouter([
  {
    children: [
      { path: "/", element: <Login /> },
      { path: "/home", element: <Home /> },
      { path: "/clientes", element: <Clientes /> },
      { path: "/cadastrar-cliente", element: <CadastrarCliente /> },
      { path: "/ordem-de-servico", element: <OrdemDeServiço /> },
      {
        path: "/cadastrar-ordem-de-servico",
        element: <CadastrarOrdemDeServiço />,
      },
      { path: "/agenda", element: <Agenda /> },
      { path: "/financeiro", element: <Financeiro /> },
      { path: "/cadastrar-financeiro", element: <CadastrarFinanceiro /> },
    ],
  },
]);
