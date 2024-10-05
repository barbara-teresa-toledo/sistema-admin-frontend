import { FileDoneOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";

const APIServiceOrder = `https://eletro-ar-admin-test-87989372b32e.herokuapp.com/api/service-orders`;
const APIClients = `https://eletro-ar-admin-test-87989372b32e.herokuapp.com/api/clients`;

const Home = () => {
  const [totalOS, setTotalOS] = useState(0);
  const [totalClients, setTotalClients] = useState(0);

  useEffect(() => {
    const fetchServiceOrders = async () => {
      try {
        const response = await fetch(APIServiceOrder, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setTotalOS(data.service_orders.total);
      } catch (error) {
        console.log("Erro:", error);
      }
    };

    fetchServiceOrders();
  }, []);

  useEffect(() => {
    const fetchServiceOrders = async () => {
      try {
        const response = await fetch(APIClients, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setTotalClients(data.clients.total);
      } catch (error) {
        console.log("Erro:", error);
      }
    };

    fetchServiceOrders();
  }, []);

  return (
    <Layout>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false} className="bg-gray-50">
            <Statistic
              title="Ordens de Serviço Geradas"
              value={totalOS}
              prefix={<FileDoneOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} className="bg-gray-50">
            <Statistic
              title="Clientes Cadastrados"
              value={totalClients}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
