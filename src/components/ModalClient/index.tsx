import { Modal, Form, Input, Button, Divider } from "antd";
import { useEffect } from "react";

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

interface ClientModalProps {
  visible: boolean;
  client: DataType | null;
  onCancel: () => void;
  onOk: (values: DataType) => void;
}

const ClientModal: React.FC<ClientModalProps> = ({
  visible,
  client,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (client) {
      form.setFieldsValue(client);
    }
  }, [client, form]);

  return (
    <Modal
      title="Editar Cliente"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      {client && (
        <Form
          form={form}
          initialValues={{
            ...client,
            address: {
              ...client.address,
            },
          }}
          onFinish={onOk}
        >
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
      )}
    </Modal>
  );
};

export default ClientModal;
