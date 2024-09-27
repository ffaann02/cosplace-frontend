import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { FaLock, FaUser } from "react-icons/fa";

const { Title } = Typography;

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const LoginFormCard = () => {
  return (
    <div className="bg-blue-100 drop-shadow-sm border border-blue-200 w-fit mx-auto pt-6 pb-0 px-10 rounded-3xl mt-16">
      <Title style={{ fontWeight: "400", textAlign: "center", marginBottom: 16 }} level={5}>
        เริ่มต้นใช้งานและสนุกไปกับการคอสเพลย์ได้เลย!
      </Title>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ minWidth: 360, maxWidth: 480 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            size="large"
            prefix={<FaUser />}
            placeholder="Username or Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            size="large"
            prefix={<FaLock />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button size="large" block type="primary" color="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="">Register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginFormCard;
