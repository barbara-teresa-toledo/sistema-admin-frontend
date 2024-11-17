import { DollarOutlined, FallOutlined, RiseOutlined } from "@ant-design/icons";
import { Button, Divider, List, Pagination, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardFinancialSummary from "../../../components/CardFinancialSummary";
import IconFinancial from "../../../components/IconFinancial";
import Layout from "../../../components/Layout";
import FinancialModal from "../../../components/ModalFinancial";
import moment from "moment";

const API = `http://3.129.68.84/api/financial`;

interface DataType {
  id: string;
  date: string;
  description: string;
  value: number;
  type: number;
  deleted_at?: string;
}

const Financeiro = () => {
  const navigate = useNavigate();
  const cadastrar = () => {
    navigate("/cadastrar-financeiro");
  };
  const [list, setList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOperation, setEditingOperation] = useState<DataType | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  const [caixa, setCaixa] = useState(0);

  useEffect(() => {
    const fetchFinancial = async () => {
      try {
        const response = await fetch(`${API}?page=${currentPage}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const formattedData = data.operations.data.map((item: DataType) => ({
          ...item,
          date: moment(item.date, "YYYY-MM-DD"),
          value: (item.value / 100).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          type: item.type.toString(),
        }));

        setList(formattedData);
        setTotalPages(data.operations.total);

        const totalEntradas = formattedData
          .filter(
            (item: DataType) => item.type == 0 && item.deleted_at === null
          )
          .reduce(
            (acc: number, item: DataType) =>
              acc + parseFloat(item.value.toString().replace(",", ".")),
            0
          );

        const totalSaidas = formattedData
          .filter(
            (item: DataType) => item.type == 1 && item.deleted_at === null
          )
          .reduce(
            (acc: number, item: DataType) =>
              acc + parseFloat(item.value.toString().replace(",", ".")),
            0
          );

        const totalCaixa = totalEntradas - totalSaidas;

        setEntradas(totalEntradas);
        setSaidas(totalSaidas);
        setCaixa(totalCaixa);
      } catch (error) {
        console.log("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancial();
  }, [currentPage]);

  const handleEdit = (operation: DataType) => {
    setEditingOperation(operation);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setList(list.filter((operation) => operation.id !== id));
      message.success("Operação excluída com sucesso!");
    } catch (error) {
      console.log("Erro ao excluir operação:", error);
      message.error("Erro ao excluir operação.");
    }
  };

  const handleModalOk = async (values: DataType) => {
    try {
      const updatedValues = {
        ...values,
        value:
          values.value !== undefined && values.value !== null
            ? parseInt(values.value.toString().replace(",", ".")) * 100
            : parseInt(editingOperation?.value.toString() || "0") * 100,
        id: editingOperation?.id,
      };

      const response = await fetch(`${API}/${editingOperation?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValues),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedOperation = await response.json();
      setList(
        list.map((operation) =>
          operation.id === updatedOperation.id ? updatedOperation : operation
        )
      );
      message.success("Operação atualizada com sucesso!");
    } catch (error) {
      console.log("Erro ao atualizar operação:", error);
      message.error("Erro ao atualizar operação.");
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingOperation(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="px-auto justify-around flex col-3">
        <CardFinancialSummary
          content={`R$ ${caixa.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          title="Caixa Atual"
          icon={
            <DollarOutlined aria-label="Ícone de dólar representando o caixa atual" />
          }
          color="text-blue-800 border-blue-800 bg-blue-100"
        />

        <CardFinancialSummary
          content={`R$ ${entradas.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          title="Entradas"
          icon={
            <RiseOutlined aria-label="Ícone de setas para cima representando entradas" />
          }
          color="text-green-800 border-green-800 bg-green-100"
        />

        <CardFinancialSummary
          content={`R$ ${saidas.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          title="Saídas"
          icon={
            <FallOutlined aria-label="Ícone de setas para baixo representando saídas" />
          }
          color="text-red-800 border-red-800 bg-red-100"
        />
      </div>
      <Divider type="horizontal" className="w-full border" />
      <div className="flex w-full justify-end">
        <Button
          type="primary"
          onClick={cadastrar}
          aria-label="Adicionar novo registro financeiro"
        >
          Adicionar Novo
        </Button>
      </div>
      <div>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          loading={loading}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  key="list-loadmore-edit"
                  onClick={() => handleEdit(item)}
                  aria-label={`Editar operação de ${item.value} reais`}
                >
                  Editar
                </a>,
                <a
                  key="list-loadmore-delete"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Excluir operação de ${item.value} reais`}
                >
                  Excluir
                </a>,
              ]}
            >
              <List.Item.Meta
                title={`R$ ${item.value}`}
                description={item.description}
                avatar={
                  <IconFinancial
                    type={item.type}
                    aria-label={`Ícone financeiro do tipo ${
                      item.type === 1 ? "Entrada" : "Saída"
                    }`}
                  />
                }
              />
            </List.Item>
          )}
        />

        <Pagination
          current={currentPage}
          total={totalPages}
          onChange={handlePageChange}
        />

        <FinancialModal
          visible={isModalVisible}
          operation={editingOperation}
          onCancel={handleModalCancel}
          onOk={handleModalOk}
        />
      </div>
    </Layout>
  );
};

export default Financeiro;
