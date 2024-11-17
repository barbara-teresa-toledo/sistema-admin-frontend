import { Button, Cascader, DatePicker, Form, Input, Modal } from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
import { useEffect } from "react";
import type { CascaderProps } from "antd";

interface DataType {
  id: string;
  date: string;
  description: string;
  value: number;
  type: number;
}

interface Option {
  value: string;
  label: string;
}

interface FinancialModalProps {
  visible: boolean;
  operation: DataType | null;
  onCancel: () => void;
  onOk: (values: DataType) => Promise<void>;
}

const FinancialModal: React.FC<FinancialModalProps> = ({
  visible,
  operation,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (operation) {
      form.setFieldsValue(operation);
    }
  }, [operation, form]);

  const options: Option[] = [
    {
      value: "0",
      label: "Entrada",
    },
    {
      value: "1",
      label: "Saída",
    },
  ];

  const onChangeType: CascaderProps<Option>["onChange"] = (
    value: (string | number)[]
  ) => {
    form.setFieldsValue({ type: value[0] });
  };

  return (
    <Modal
      title="Editar Operação"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      {operation && (
        <Form
          form={form}
          initialValues={{
            ...operation,
          }}
          onFinish={onOk}
        >
          <div className="flex w-full justify-between">
            <Form.Item label="Data" name="date" aria-label="Data da Operação">
              <DatePicker
                locale={locale}
                minuteStep={5}
                placeholder="Selecione uma data"
                name="date"
                format={"DD/MM/YYYY"}
                aria-required="true"
              />
            </Form.Item>

            <Form.Item
              label="Tipo"
              name="type"
              className="w-1/3"
              aria-label="Tipo de Operação"
            >
              <Cascader
                options={options}
                onChange={onChangeType}
                placeholder="Selecione o tipo"
                defaultValue={[0]}
                aria-required="true"
              />
            </Form.Item>

            <Form.Item
              label="Valor"
              name="value"
              className="w-1/3"
              aria-label="Valor da Operação"
            >
              <Input prefix="R$ " aria-required="true" />
            </Form.Item>
          </div>

          <Form.Item
            label="Descrição"
            name="description"
            aria-label="Descrição da Operação"
          >
            <Input placeholder="Digite uma descrição" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              aria-label="Salvar Operação"
            >
              Salvar
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default FinancialModal;
