import { apiClientWithAuth } from '@/api';
import { useAuth } from '@/context/auth-context';
import { Form, Input, Button, message, Popconfirm } from 'antd';
import { useState } from 'react';

const PasswordAndSecurity = () => {
    const [form] = Form.useForm();
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);
    const onFinish = async (values: any) => {
        const { old_password, new_password, confirm_password } = values;
        if (new_password !== confirm_password) {
            message.error("New password and confirm password do not match");
            return;
        }
        try{
            setError([]);
            setLoading(true);
            const response = await apiClientWithAuth.put('/auth/change-password', {
                user_id: user?.user_id,
                old_password,
                new_password,
                confirm_password
            });
            form.resetFields();
            message.success(response.data.message_th);
            setLoading(false);
        }
        catch (error: any) {
            console.error(error);
            setError(error.response.data.error);
            setLoading(false);
        }
    };

    const onCancel = () => {
        form.resetFields();
    };

    return (
        <div>
            <h4 className="font-semibold mt-6">เปลี่ยนรหัสผ่านปัจจุบัน</h4>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="รหัสผ่านเดิม (Old Password)"
                    name="old_password"
                    rules={[{ required: true, message: 'โปรดใส่รหัสผ่านเดิม' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="รหัสผ่านใหม่ (New Password)"
                    name="new_password"
                    rules={[
                        { required: true, message: 'กรุณากรอกรหัสผ่านใหม่' },
                        { min: 8, message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร' },
                        { pattern: /.*[a-zA-Z].*/, message: 'รหัสผ่านต้องมีตัวอักษรอย่างน้อย 1 ตัว' }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="ยืนยันรหัสผ่านใหม่ (Confirm New Password)"
                    name="confirm_password"
                    dependencies={['new_password']}
                    rules={[
                        { required: true, message: 'กรุณายืนยันรหัสผ่านใหม่' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                {error.length>0 && <p className="-mt-4 mb-4 text-lg text-red-600">{error}</p>}
                <Form.Item>
                    <Popconfirm
                        placement="bottom"
                        title="คุณต้องยกเลิกการเปลี่ยนรหัสใช่หรือไม่"
                        description=""
                        okText="ใช่"
                        cancelText="ไม่"
                        onConfirm={onCancel}
                    >
                        <Button type="default" style={{ marginRight: 6 }}>
                            ยกเลิก
                        </Button>
                    </Popconfirm>
                    <Button
                        loading={loading}
                    type="primary" htmlType="submit">
                        เปลี่ยนรหัสผ่าน
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PasswordAndSecurity;