import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
import moment from "moment";
import Layout from "../../../../components/Layout";

const APIFinancial = `http://3.129.68.84/api/financial`;

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

const CadastrarNovo = () => {
  const [form] = Form.useForm();

  const cadastrar = async (values: DataType) => {
    try {
      values.value = Math.round(values.value * 100);
      values.date = moment(values.date).format("YYYY-MM-DD HH:mm:ss");

      const response = await fetch(APIFinancial, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      message.success("Operação financeira cadastrada com sucesso!");
    } catch (error) {
      console.log("Erro ao atualizar operação financeira:", error);
      message.error("Erro ao atualizar operação financeira.");
    }
  };

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

  return (
    <Layout>
      <Form form={form} initialValues={{}} onFinish={cadastrar}>
        <div className="flex w-full justify-between">
          <Form.Item label="Data" name="date" aria-label="Data da operação">
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
            aria-label="Tipo de operação"
          >
            <Cascader
              options={options}
              placeholder="Selecione o tipo"
              value={
                form.getFieldValue("type") !== undefined
                  ? [form.getFieldValue("type")]
                  : undefined
              }
              onChange={(value) => {
                form.setFieldsValue({ type: value[0] });
              }}
              aria-required="true"
            />
          </Form.Item>

          <Form.Item
            label="Valor"
            name="value"
            className="w-1/3"
            aria-label="Valor da operação"
          >
            <InputNumber
              aria-required="true"
              style={{ width: "100%" }}
              min={0}
              step={0.01}
              formatter={(value) =>
                value
                  ? `R$ ${Number(value)
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                      .replace("R$", "")
                      .trim()}`
                  : ""
              }
              parser={(value) =>
                value
                  ? parseFloat(
                      value.replace(/\D/g, "").replace(",", ".") || "0"
                    ) / 100
                  : 0
              }
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Descrição"
          name="description"
          aria-label="Descrição da operação"
        >
          <Input placeholder="Digite uma descrição" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" aria-label="Salvar operação">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default CadastrarNovo;
