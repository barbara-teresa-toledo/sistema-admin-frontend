import { Button, Input, List, Pagination, Skeleton, message } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import OSModal from "../../../components/ModalOS";
import PDFModal from "../../../components/ModalPDF";
import moment from "moment";
import "moment/dist/locale/pt-br";

const { Search } = Input;

const API = `http://3.129.68.84/api/service-orders`;

interface AddressType {
  id: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zip_code: string;
}

interface ClientType {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  address: AddressType;
}
interface DataType {
  id: string;
  service_date: string;
  service_description: string;
  client_id: string;
  client: ClientType;
}

const OrdemDeServico = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingServiceOrder, setEditingServiceOrder] =
    useState<DataType | null>(null);
  const [printingServiceOrder, setPrintingServiceOrder] =
    useState<DataType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPDFModalVisible, setIsPDFModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchServiceOrders = async () => {
      try {
        const response = await fetch(`${API}?page=${currentPage}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setList(data.service_orders.data);
        setTotalPages(data.service_orders.total);
      } catch (error) {
        console.log("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceOrders();
  }, [currentPage]);

  const handleEdit = (service_order: DataType) => {
    setEditingServiceOrder(service_order);
    setIsModalVisible(true);
  };

  const handlePrint = (service_order: DataType) => {
    setPrintingServiceOrder(service_order);
    setIsPDFModalVisible(true);
    console.log(service_order.service_date);
  };

  const handlePrintOk = () => {
    message.success("PDF gerado com sucesso!");
    setIsPDFModalVisible(false);
  };

  const handlePrintCancel = () => {
    setIsPDFModalVisible(false);
    setPrintingServiceOrder(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setList(list.filter((client) => client.id !== id));
      message.success("Ordem de serviço excluída com sucesso!");
    } catch (error) {
      console.log("Erro ao excluir ordem de serviço:", error);
      message.error("Erro ao excluir ordem de serviço.");
    }
  };

  const handleModalOk = async (values: DataType) => {
    try {
      const response = await fetch(`${API}/${editingServiceOrder?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedServiceOrder = await response.json();
      setList(
        list.map((service_order) =>
          service_order.id === updatedServiceOrder.id
            ? updatedServiceOrder
            : service_order
        )
      );
      message.success("Ordem de serviço atualizada com sucesso!");
    } catch (error) {
      console.log("Erro ao atualizar ordem de serviço:", error);
      message.error("Erro ao atualizar ordem de serviço.");
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingServiceOrder(null);
  };

  const cadastrar = () => {
    navigate("/cadastrar-ordem-de-servico");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchText(value);
  };

  const filteredList = list.filter((service_order) =>
    service_order.client.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex w-full justify-between pb-5">
        <Search
          placeholder="Pesquisar"
          onSearch={onSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={cadastrar}>
          Cadastrar Novo
        </Button>
      </div>
      <List
        className="demo-list"
        itemLayout="horizontal"
        dataSource={filteredList}
        loading={loading}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-edit" onClick={() => handleEdit(item)}>
                Editar
              </a>,
              <a key="list-delete" onClick={() => handleDelete(item.id)}>
                Excluir
              </a>,
              <a key="list-imprimir" onClick={() => handlePrint(item)}>
                Imprimir
              </a>,
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                title={`OS ${item.id} - ${item.client.name}`}
                description={moment(item.service_date)
                  .subtract(3, "hours")
                  .format("LLLL")}
              />
            </Skeleton>
          </List.Item>
        )}
      />

      <Pagination
        current={currentPage}
        total={totalPages}
        onChange={handlePageChange}
      />

      <OSModal
        visible={isModalVisible}
        service_order={editingServiceOrder}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
      />

      <PDFModal
        visible={isPDFModalVisible}
        service_order={printingServiceOrder}
        onCancel={handlePrintCancel}
        onOk={handlePrintOk}
      />
    </Layout>
  );
};

export default OrdemDeServico;
