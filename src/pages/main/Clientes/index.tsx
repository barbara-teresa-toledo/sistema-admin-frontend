import { Button, Input, List, Pagination, Skeleton, message } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import ClientModal from "../../../components/ModalClient";

const { Search } = Input;

const API = `https://eletro-ar-admin-test-87989372b32e.herokuapp.com/api/clients`;

interface AddressType {
  id: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zip_code: string;
}

interface DataType {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  address: AddressType;
}

const Clientes = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<DataType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${API}?page=${currentPage}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setList(data.clients.data);
        setTotalPages(data.clients.total);
      } catch (error) {
        console.log("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [currentPage]);

  const handleEdit = (client: DataType) => {
    setEditingClient(client);
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
      setList(list.filter((client) => client.id !== id));
      message.success("Cliente excluído com sucesso!");
    } catch (error) {
      console.log("Erro ao excluir cliente:", error);
      message.error("Erro ao excluir cliente.");
    }
  };

  const handleModalOk = async (values: DataType) => {
    try {
      const response = await fetch(`${API}/${editingClient?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedClient = await response.json();
      setList(
        list.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        )
      );
      message.success("Cliente atualizado com sucesso!");
    } catch (error) {
      console.log("Erro ao atualizar cliente:", error);
      message.error("Erro ao atualizar cliente.");
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingClient(null);
  };

  const cadastrarNovoCliente = () => {
    navigate("/cadastrar-cliente");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchText(value);
  };

  const filteredList = list.filter((client) =>
    client.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex w-full justify-between pb-5">
        <Search
          placeholder="Pesquisar"
          onSearch={onSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={cadastrarNovoCliente}>
          Cadastrar Novo
        </Button>
      </div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={filteredList}
        loading={loading}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit" onClick={() => handleEdit(item)}>
                Editar
              </a>,
              <a
                key="list-loadmore-delete"
                onClick={() => handleDelete(item.id)}
              >
                Excluir
              </a>,
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta title={item.name} description={item.email} />
            </Skeleton>
          </List.Item>
        )}
      />

      <Pagination
        current={currentPage}
        total={totalPages}
        onChange={handlePageChange}
      />

      <ClientModal
        visible={isModalVisible}
        client={editingClient}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
      />
    </Layout>
  );
};

export default Clientes;
