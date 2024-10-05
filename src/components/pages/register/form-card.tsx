import { apiClientWithAuth } from "@/api";
import { RegisterFormValues } from "@/app/register/page";
import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import { FaGoogle, FaLock, FaUser, FaRegUser, FaCalendarAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoMail } from "react-icons/io5";

interface RegisterFormCardProps {
    onFinish: (values: RegisterFormValues) => void;
}

const RegisterFormCard = ({ onFinish }: RegisterFormCardProps) => {

    const testFetch = async () => {
        const response = await apiClientWithAuth.get("/commission");
        console.log(response.data);
    };

    return (
        <div className="bg-primary-50 drop-shadow-sm border text-primary-800 border-primary-200 mx-auto p-6 pb-8 sm:px-6 rounded-3xl mt-8">
            <h3 className="text-center mb-4">สมัครบัญชีเพื่อใช้บริการแพลตฟอร์ม</h3>
            <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item
                    name="firstname"
                    rules={[{ required: true, message: "โปรดกรอกชื่อจริง" }]}
                >
                    <Input
                        size="large"
                        prefix={<FaRegUser />}
                        placeholder="First name"
                    />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    rules={[{ required: true, message: "โปรดกรอกนามสกุล" }]}
                >
                    <Input
                        size="large"
                        prefix={<FaRegUser />}
                        placeholder="Last name"
                    />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    rules={[{ required: true, message: "โปรดกรอกเบอร์โทรศัพท์มือถือ" }]}
                >
                    <Input
                        size="large"
                        prefix={<FiPhone />}
                        placeholder="Phone number"
                    />
                </Form.Item>
                <Form.Item
                    name="dateOfBirth"
                    rules={[{ required: true, message: "โปรดเลือกวันเกิด" }]}
                >
                    <DatePicker
                        size="large"
                        placeholder="Date of birth"
                        format="YYYY-MM-DD"
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "โปรดกรอก Username" }]}
                >
                    <Input
                        size="large"
                        prefix={<FaUser />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: "โปรดกรอก Email" }]}
                >
                    <Input
                        size="large"
                        prefix={<IoMail />}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "โปรดกรอกรหัสผ่าน" }]}
                >
                    <Input
                        size="large"
                        prefix={<FaLock />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={[
                        { required: true, message: "โปรดกรอกรหัสผ่าน" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน'));
                            },
                        }),
                    ]}
                >
                    <Input
                        size="large"
                        prefix={<FaLock />}
                        type="password"
                        placeholder="Confirm password"
                    />
                </Form.Item>
                <div className="-mt-4 flex justify-between">
                    <Form.Item name="accept" valuePropName="checked">
                        <Checkbox>ฉันยอมรับการให้ข้อมูลส่วนบุคคลเพื่อการให้บริการ</Checkbox>
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button size="large" block type="primary" htmlType="submit">
                        สมัครบัญชี
                    </Button>
                </Form.Item>
            </Form>
            <p className="text-center -mt-2 mb-4 text-sm">หรือ</p>
            <Button
                onClick={testFetch}
                icon={<FaGoogle />}
                size="large"
                block
                type="default"
                htmlType="submit"
                color="primary"
            >
                ลงชื่อเข้าใช้ด้วย Google
            </Button>
        </div>
    );
};

export default RegisterFormCard;