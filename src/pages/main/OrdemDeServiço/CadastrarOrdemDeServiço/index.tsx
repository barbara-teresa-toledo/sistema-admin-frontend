import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  message,
} from "antd";
import Layout from "../../../../components/Layout";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import locale from "antd/es/date-picker/locale/pt_BR";

const APIClient = `https://eletro-ar-admin-test-87989372b32e.herokuapp.com/api/clients`;
const APIServiceOrder = `https://eletro-ar-admin-test-87989372b32e.herokuapp.com/api/service-orders`;

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

const CadastrarOrdemDeServico = () => {
  const [form] = Form.useForm();
  const [clientsList, setClientsList] = useState<ClientType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const cadastrar = async (values: DataType) => {
    try {
      const response = await fetch(APIServiceOrder, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      message.success("Ordem de serviço atualizada com sucesso!");
    } catch (error) {
      console.log("Erro ao atualizar ordem de serviço:", error);
      message.error("Erro ao atualizar ordem de serviço.");
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          `${APIClient}?page=${currentPage}&per_page=500`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setClientsList(data.clients.data);
      } catch (error) {
        console.log("Erro:", error);
        console.log(setCurrentPage);
      }
    };

    fetchClients();
  }, [currentPage]);

  const onChange = (clientId: string) => {
    const selectedClient = clientsList.find((client) => client.id === clientId);
    if (selectedClient) {
      form.setFieldsValue({
        client_id: selectedClient.id,
        client: {
          name: selectedClient.name,
          email: selectedClient.email,
          phone: selectedClient.phone,
          document: selectedClient.document,
          address: {
            zip_code: selectedClient.address.zip_code,
            street: selectedClient.address.street,
            number: selectedClient.address.number,
            city: selectedClient.address.city,
            state: selectedClient.address.state,
            complement: selectedClient.address.complement,
          },
        },
      });
    }
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Layout>
      <Form form={form} initialValues={{}} onFinish={cadastrar}>
        <Form.Item label="Data do Serviço" name="service_date">
          <DatePicker
            locale={locale}
            showTime={{ format: "HH:mm" }}
            minuteStep={5}
            placeholder=""
            name="service_date"
            format={"DD/MM/YYYY - HH:mm"}
          />
        </Form.Item>
        <Form.Item label="Descrição do Serviço" name="service_description">
          <TextArea rows={2} />
        </Form.Item>

        <Divider />

        <Form.Item label="ID" name="client_id" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="Cliente" name={["client", "name"]}>
          <Select
            showSearch
            placeholder="Selecione o cliente"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={clientsList.map((client) => ({
              value: client.id,
              label: client.name,
            }))}
          />
        </Form.Item>
        <Form.Item label="Email" name={["client", "email"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Telefone" name={["client", "phone"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Documento" name={["client", "document"]}>
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item label="CEP" name={["client", "address", "zip_code"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Logradouro" name={["client", "address", "street"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Número" name={["client", "address", "number"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Cidade" name={["client", "address", "city"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Estado" name={["client", "address", "state"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Complemento"
          name={["client", "address", "complement"]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default CadastrarOrdemDeServico;
