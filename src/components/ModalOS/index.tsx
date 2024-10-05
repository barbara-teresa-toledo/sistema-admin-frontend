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

interface OSModalProps {
  visible: boolean;
  service_order: DataType | null;
  onCancel: () => void;
  onOk: (values: DataType) => void;
}

const OSModal: React.FC<OSModalProps> = ({
  visible,
  service_order,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (service_order) {
      form.setFieldsValue(service_order);
    }
  }, [service_order, form]);

  return (
    <Modal
      title="Ordem de Serviço"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      {service_order && (
        <Form
          form={form}
          initialValues={{
            ...service_order,
            client: {
              ...service_order.client,
            },
          }}
          onFinish={onOk}
        >
          <Form.Item label="Data do Serviço" name="service_date">
            <Input />
          </Form.Item>
          <Form.Item label="Descrição do Serviço" name="service_description">
            <Input />
          </Form.Item>
          <Form.Item name="client_id" hidden />
          <Divider />
          <Form.Item label="Cliente" name={["client", "name"]}>
            <Input />
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
      )}
    </Modal>
  );
};

export default OSModal;
