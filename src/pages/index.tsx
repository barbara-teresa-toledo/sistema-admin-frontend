import { useNavigate } from "react-router-dom";
import LayoutLogin from "../components/LayoutLogin";
import { Button, Form, type FormProps, Input, message } from "antd";

const API = `https://eletro-ar-admin-test-87989372b32e.herokuapp.com/api/login`;

interface DataType {
  email?: string;
  password?: string;
  device_name?: string;
}

const Login = () => {
  const navigate = useNavigate();

  const fazerLogin = async (values: DataType) => {
    try {
      values.device_name = "site";
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
      navigate("/home");
      message.success("Bem vindo!");
    } catch (error) {
      console.log("Erro ao realizar login:", error);
      message.error("Erro ao realizar login.");
    }
  };

  const onFinish: FormProps<DataType>["onFinish"] = (values) => {
    console.log("Success:", values);
    fazerLogin(values);
  };

  const onFinishFailed: FormProps<DataType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LayoutLogin>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="flex flex-col items-center justify-center h-full "
        layout="vertical"
      >
        <Form.Item label="Email" name="email" className="w-[400px]">
          <Input />
        </Form.Item>

        <Form.Item label="Senha" name="password" className="w-[400px]">
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={() => fazerLogin}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </LayoutLogin>
  );
};

export default Login;
