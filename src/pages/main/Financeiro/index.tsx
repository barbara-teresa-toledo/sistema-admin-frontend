import CardFinancialSummary from "../../../components/CardFinancialSumamry";
import Layout from "../../../components/Layout";
import {
  DollarOutlined,
  FallOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const Financeiro = () => {
  return (
    <Layout>
      <div className="px-auto justify-around flex col-3">
        <CardFinancialSummary content="5000" title="Caixa Atual" icon={<DollarOutlined />} color="text-blue-800 border-blue-800 bg-blue-100" />

        <CardFinancialSummary content="5000" title="Entradas" icon={<RiseOutlined />} color="text-green-800 border-green-800 bg-green-100" />

        <CardFinancialSummary content="5000" title="Saídas" icon={<FallOutlined />} color="text-red-800 border-red-800 bg-red-100" />
      </div>

    </Layout>
  );
};

export default Financeiro;
