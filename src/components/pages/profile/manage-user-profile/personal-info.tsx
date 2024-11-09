import { divider } from "@/config/theme";
import { Button, Divider, Form, Input, Space } from "antd";

const PersonalInfo = () => {
  return (
    <div className="w-full">
      <h5 className="text-lg">โปรไฟล์</h5>
      <Divider style={divider} />
      <Form layout="vertical" style={{ marginTop: 12 }}>
        <Form.Item
          label="ชื่อบัญผู้ใช้"
          style={{ width: "50%", position: "relative"}}
        >
          <Input placeholder="ชื่อ" value={"test"} size="large" disabled style={{marginTop:-6}} />
          <button className="absolute right-2.5 top-1 text-primary-400 hover:underline">
            แก้ไข
          </button>
        </Form.Item>
        <Form.Item
          label="ชื่อบัญผู้ใช้"
          style={{ width: "50%", position: "relative"}}
        >
          <Input placeholder="ชื่อ" value={"test"} size="large" disabled style={{marginTop:-6}} />
          <button className="absolute right-2.5 top-1 text-primary-400 hover:underline">
            แก้ไข
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default PersonalInfo;
