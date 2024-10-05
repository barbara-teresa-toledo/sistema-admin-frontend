import { Button, Divider, Form, Input, message } from "antd";
import Layout from "../../../../components/Layout";

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

const CadastrarCliente = () => {
  const [form] = Form.useForm();

  const cadastrar = async (values: DataType) => {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      message.success("Cliente cadastrado com sucesso!");
    } catch (error) {
      console.log("Erro ao cadastrar cliente:", error);
      message.error("Erro ao cadastrar cliente.");
    }
  };

  return (
    <Layout>
      <Form form={form} initialValues={{}} onFinish={cadastrar}>
        <Form.Item label="Nome" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Telefone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Documento" name="document">
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item label="CEP" name={["address", "zip_code"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Logradouro" name={["address", "street"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Número" name={["address", "number"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Cidade" name={["address", "city"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Estado" name={["address", "state"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Complemento" name={["address", "complement"]}>
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

export default CadastrarCliente;
