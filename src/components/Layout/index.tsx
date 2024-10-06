import React, { ReactNode } from "react";
import { Button, Layout as LayoutAntd, Menu } from "antd";
import {
  DollarOutlined,
  ReconciliationOutlined,
  CalendarOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Content, Sider, Footer } = LayoutAntd;

interface MenuItem {
  key: string;
  icon?: JSX.Element;
  label?: string;
  path?: string;
}

interface LayoutProps {
  children: ReactNode;
}

const items: MenuItem[] = [
  {
    key: "1",
    icon: <UserAddOutlined />,
    label: "Clientes",
    path: "/clientes",
  },
  {
    key: "2",
    icon: <ReconciliationOutlined />,
    label: "Ordens de Serviço",
    path: "/ordem-de-servico",
  },
  {
    key: "3",
    icon: <DollarOutlined />,
    label: "Financeiro",
    path: "/financeiro",
  },
  { key: "4", icon: <CalendarOutlined />, label: "Agenda", path: "/agenda" },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuItemClick = (path: string) => {
    path ? navigate(path) : "";
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <LayoutAntd className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <img
          src="/images/logo.jpeg"
          alt="logo"
          className="bg-white rounded my-2 mx-auto h-12"
          onClick={handleHome}
        />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
        >
          {items.map((item) => (
            <Menu.Item
              key={`/${item.key}`}
              icon={item.icon}
              onClick={() => handleMenuItemClick(item.path!)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <LayoutAntd>
        <Header className="flex flex-row w-full items-center justify-end text-white">
          <Button
            onClick={handleLogout}
            shape="circle"
            size="large"
            className="bg-dark_blue text-white border-none hover:text-dark_blue active:bg-pink-400"
          >
            <LogoutIcon />
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="rounded bg-white min-h-full p-5">{children}</div>
        </Content>
        <Footer className="text-center"></Footer>
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
