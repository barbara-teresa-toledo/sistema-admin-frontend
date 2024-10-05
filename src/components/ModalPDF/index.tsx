import { Modal, Form, Button, Divider } from "antd";
import { useEffect } from "react";
import { usePDF } from "react-to-pdf";
import moment from "moment";
import "moment/dist/locale/pt-br";

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
interface PDFModalProps {
  visible: boolean;
  service_order: DataType | null;
  onCancel: () => void;
  onOk: (values: DataType) => void;
}

const PDFModal: React.FC<PDFModalProps> = ({
  visible,
  service_order,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();
  const { toPDF, targetRef } = usePDF({
    filename: `OS_${service_order?.id}`,
  });

  useEffect(() => {
    if (service_order) {
      form.setFieldsValue(service_order);
    }
  }, [service_order, form]);

  return (
    <Modal
      title="Imprimir Ordem de Serviço"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      className="min-w-[80vw]"
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
          <div ref={targetRef} className="w-full flex flex-col pt-10 px-16">
            <div className="flex justify-between items-center">
              <img src="/images/logo.jpeg" alt="Logo" width={100} />
              <h2 className="font-medium text-xl">Ordem de Serviço</h2>
              <h3 className="text-xl font-bold">Nº {service_order.id}</h3>
            </div>

            <Divider />

            <div className="flex justify-start">
              <p className="w-1/2">
                <span className="font-bold">Data do Serviço: </span>
                {moment(
                  service_order.service_date,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("L")}
                {" ("}
                {moment(
                  service_order.service_date,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("dddd")}
                {")"}
              </p>
              <p className="w-1/2">
                <span className="font-bold">Horário Agendado: </span>
                {moment(service_order.service_date, "yyyy-mm-dd hh:mm:ss")
                  .subtract(3, "hours")
                  .format("LT")}
              </p>
            </div>

            <p>
              <span className="font-bold">Descrição do Serviço: </span>
              {service_order.service_description}
            </p>
            <p hidden>{service_order.client_id}</p>

            <Divider />

            <div className="flex flex-wrap">
              <p className="w-full">
                <span className="font-bold">Cliente: </span>
                {service_order.client.name}
              </p>
              <p className="w-1/2">
                <span className="font-bold">Email: </span>
                {service_order.client.email}
              </p>
              <p className="w-1/4">
                <span className="font-bold">Telefone: </span>
                {service_order.client.phone}
              </p>
              <p className="w-1/4">
                <span className="font-bold">Documento: </span>
                {service_order.client.document}
              </p>
            </div>

            <Divider />

            <p>
              <span className="font-bold">CEP: </span>
              {service_order.client.address.zip_code}
            </p>
            <p>
              <span className="font-bold">Endereço: </span>
              {service_order.client.address.street},{" "}
              {service_order.client.address.number}
              {" - "}
              {service_order.client.address.city},{" "}
              {service_order.client.address.state}
            </p>
            <p>
              <span className="font-bold">Complemento: </span>
              {service_order.client.address.complement}
            </p>

            <Divider />

            <div className="mt-3">
              <p className="font-bold">Serviço Realizado: </p>
              <div className="w-full h-[200px] border rounded my-3"></div>
            </div>
            <div className="mt-3">
              <p className="font-bold">Material Utilizado:</p>
              <div className="w-full h-[200px] border rounded my-3"></div>
            </div>
            <div className="mt-3">
              <p className="font-bold">Observações: </p>
              <div className="w-full h-[200px] border rounded my-3"></div>
            </div>

            <div className="flex justify-around mt-[100px]">
              <div className="flex justify-center w-[300px] border-t border-black py-3 mt-10">
                <p>Assinatura Cliente</p>
              </div>
              <div className="flex justify-center w-[300px] border-t border-black py-3 mt-10">
                <p>Assinatura Funcionário</p>
              </div>
            </div>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={() => toPDF()}>
              Imprimir OS
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default PDFModal;
