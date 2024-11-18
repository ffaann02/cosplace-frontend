import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
} from "antd";
import Image from "next/image";
import React, { useState } from "react";

export interface Bank {
  BankID: string;
  Name: string;
  Logo: string;
}

const bankOptions: Bank[] = [
  {
    BankID: "BK0001",
    Name: "กรุงธนพรีเวียส",
    Logo: "https://i.ibb.co/C1c2QcN/Krungthon-Previous.png",
  },
  {
    BankID: "BK0002",
    Name: "กรุงเทพ",
    Logo: "https://f.ptcdn.info/801/022/000/1409170288-b60f8c1e0e-o.png",
  },
  {
    BankID: "BK0003",
    Name: "กสิกรไทย",
    Logo: "https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png",
  },
  {
    BankID: "BK0004",
    Name: "กรุงไทย",
    Logo: "https://image.makewebeasy.net/makeweb/m_750x0/uaNaSYLUC/DefaultData/logo%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%84%E0%B8%97%E0%B8%A2.png?v=202311151122",
  },
  {
    BankID: "BK0005",
    Name: "ออมสิน",
    Logo: "https://i.pinimg.com/originals/fa/4b/4a/fa4b4a6ef2f95136051607a7fba619ba.png",
  },
  {
    BankID: "BK0006",
    Name: "เกียรตินาคินภัทร",
    Logo: "https://www.dpa.or.th/storage/uploads/bank/dpa_bank_kkp@2x.png",
  },
  {
    BankID: "BK0007",
    Name: "ไทยพาณิชย์",
    Logo: "https://i.pinimg.com/736x/02/31/87/023187a2f2dc47bbdc809b43c7667b3a.jpg",
  },
  {
    BankID: "BK0008",
    Name: "ยูโอบี",
    Logo: "https://i.pinimg.com/originals/dc/7e/02/dc7e02db3345b40154d5d43ef3095c26.png",
  },
  {
    BankID: "BK0009",
    Name: "ทหารไทยธนชาติ",
    Logo: "https://image.bangkokbiznews.com/uploads/images/md/2021/10/1oO2JGrYCh9i5C7Qzrpk.jpg",
  },
  {
    BankID: "BK0010",
    Name: "กรุงศรี",
    Logo: "https://i.pinimg.com/736x/ed/80/c6/ed80c67f6f6b484e3a09c85801a5e3c2.jpg",
  },
  {
    BankID: "BK0011",
    Name: "ธ.อิสลาม",
    Logo: "https://i.pinimg.com/originals/06/70/69/067069fcbe69567ec81b0240996c0632.png",
  },
  {
    BankID: "BK0012",
    Name: "ธ.ก.ส.",
    Logo: "https://i.pinimg.com/originals/70/91/88/709188b0e0530a6d4d7fee80e5ea6ac2.png",
  },
];

interface CreateShopStep1FormProps {
  form: any;
  onFinish: any;
  setCurrentStep: any;
  selectedBank: Bank | null;
  setSelectedBank: any;
  checked: boolean;
  setChecked: any;
  setFormData2: any;
}

const CreateShopStep2Form = ({
  form,
  onFinish,
  setCurrentStep,
  selectedBank,
  setSelectedBank,
  checked,
  setChecked,
  setFormData2
}: CreateShopStep1FormProps) => {
  const backStep = () => {
    setCurrentStep(0);
  };

  const onConfirm = () => {
    setCurrentStep(2);
    setFormData2(form.getFieldsValue());
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="flex flex-col gap-y-4 w-full">
        <div className="col-span-3 bg-primary-50 rounded-xl drop-shadow-sm">
          <div className="ml-6 mt-4">
            <h3 className="text-primary-800">บัญชีร้านค้า</h3>
            <button className="underline" type="button">
              ใช้ข้อมูลเดียวกับบัญชีผู้ใช้
            </button>
          </div>
          <div className="px-6 pt-2 w-full">
            <div className="flex gap-x-4">
              <Form.Item
                label="เบอร์โทรศัพท์"
                name="phone_number"
                rules={[{ required: true, message: "โปรดระบุเบอร์โทรศัพท์" }]}
                style={{ width: "50%" }}
              >
                <Input
                  size="large"
                  placeholder="เบอร์โทร"
                  onChange={(e) => {
                    form.setFieldValue("phone_number", e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="อีเมล"
                name="email"
                rules={[{ required: true, message: "โปรดระบุอีเมล" }]}
                style={{ width: "50%" }}
              >
                <Input
                  size="large"
                  placeholder="อีเมล"
                  onChange={(e) => {
                    form.setFieldValue("email", e.target.value);
                  }}
                />
              </Form.Item>
            </div>
            <h4 className="text-primary-800">ช่องทางรับเงินร้านค้า</h4>
            <div className="flex gap-x-4">
              <Form.Item
                label="บัญชีธนาคาร"
                name="bank"
                rules={[{ required: true, message: "โปรดเลือกบัญชีธนาคาร" }]}
                style={{ width: "40%" }}
              >
                <Space.Compact style={{ width: "100%" }}>
                  {selectedBank && (
                    <Image
                      src={selectedBank.Logo}
                      className="w-10 border border-r-0 border-neutral-300 rounded-l-lg bg-primary-400"
                      alt={selectedBank.Name}
                      width={24}
                      height={24}
                      unoptimized
                    />
                  )}
                  <Select
                    size="large"
                    defaultValue={selectedBank?.Name}
                    placeholder="เลือกธนาคาร"
                    optionLabelProp="label"
                    onChange={(value) => {
                      form.setFieldValue("bank", value);
                      const bank = bankOptions.find(
                        (bank) => bank.Name === value
                      ) as Bank;
                      setSelectedBank(bank);
                    }}
                  >
                    {bankOptions.map((bank) => (
                      <Select.Option
                        key={bank.BankID}
                        value={bank.Name}
                        label={bank.Name}
                      >
                        <div className="flex">
                          <Image
                            src={bank.Logo}
                            alt={bank.Name}
                            width={24}
                            height={24}
                            unoptimized
                          />
                          <p className="ml-4">{bank.Name}</p>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Space.Compact>
              </Form.Item>
              <Form.Item
                label="เลขบัญชีธนาคาร"
                name="bank_account_number"
                rules={[{ required: true, message: "โปรดระบุอีเมล" }]}
                style={{ width: "60%" }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  maxLength={15}
                  size="large"
                  placeholder="เลขบัญชี"
                  onChange={(e) => {
                    form.setFieldValue("bank_account_number", e);
                  }}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="col-span-5 bg-primary-50 rounded-xl drop-shadow-sm px-6 pt-4 h-fit">
          <h3 className="text-primary-800 mb-4">ข้อตกลงและเงื่อนไข</h3>
          <div className="h-72 overflow-y-scroll bg-white border border-primary-200 px-4 py-2 rounded-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
            consectetur, consequatur fugit quis optio illo, necessitatibus atque
            quasi non, sit consequuntur quia ullam iure eligendi voluptatum ab
            et odit fugiat aliquid. Laboriosam, at suscipit quisquam doloremque
            quam alias. Tempore distinctio ea, consectetur beatae explicabo
            illum, quaerat optio, quas magni sunt accusamus. Quidem, harum nam
            qui aperiam tempora dignissimos cupiditate porro doloremque
            provident. Iusto nisi reiciendis accusamus vel vero, accusantium
            blanditiis officiis nobis doloribus voluptatem? Adipisci asperiores
            officia sed reiciendis earum minus aliquid vitae ea blanditiis
            dolorem illo eos quam aliquam totam fugit nesciunt sequi quae dolore
            praesentium, qui veniam iusto. Modi aut nihil dolores, totam eius
            veniam eaque alias ab repellendus nemo ipsam aspernatur qui fugit
            aliquid, maxime officiis praesentium dignissimos distinctio quaerat
            vitae sequi? Numquam suscipit sunt reprehenderit culpa consequatur
            repellat doloribus facilis non officia sequi quo rem, tenetur fugiat
            unde eius quae nostrum reiciendis. Temporibus aliquam vero harum
            ipsam distinctio asperiores consectetur nihil perspiciatis
            architecto aut tenetur dolores esse incidunt unde tempora quidem,
            vitae sit enim culpa quibusdam debitis at, vel obcaecati. Dolorum
            excepturi, sunt voluptatum neque, reprehenderit deserunt doloremque
            perspiciatis, rerum asperiores aliquid pariatur necessitatibus.
            Facilis iure beatae odit sunt totam, dolor sit et fuga. Expedita,
            adipisci asperiores? Earum similique, recusandae ipsum ex omnis,
            rerum nam eos corporis quas voluptate quasi commodi optio,
            perspiciatis dicta doloremque ullam accusantium labore sapiente
            impedit autem necessitatibus adipisci ipsam mollitia? Molestias
            necessitatibus quia consequatur numquam! Nisi provident nulla
            suscipit nesciunt corrupti? Facilis, animi! Accusantium quisquam
            fuga corporis sapiente velit illum mollitia at beatae quis a quam
            similique rem, eaque in tempora soluta ipsum iste odio eos, nostrum
            dolorem? Illo consequuntur nulla cupiditate porro tempora. Cumque
            quos expedita necessitatibus adipisci natus eaque, quia atque
            doloremque perferendis sequi molestias impedit optio ipsum
            exercitationem possimus labore quo quidem facilis architecto nemo
            nam perspiciatis beatae! Rem, adipisci ab eaque ullam quae ut?
            Dolores numquam reprehenderit dignissimos enim porro maiores
            corrupti, tempora iure eius quasi? Iste magni incidunt cupiditate
            modi dolorem excepturi qui accusamus molestiae molestias quod? Quod
            repudiandae commodi at. Eveniet, iure molestias id in suscipit,
            accusamus aliquid numquam nulla corrupti hic tempore saepe eum
            accusantium nemo dolores ea consequuntur alias ipsum unde,
            laboriosam quibusdam quidem. Minima, laboriosam hic provident
            dolorum ea consectetur nobis laudantium quis enim. Saepe, amet
            error. Nihil mollitia voluptates rerum eligendi molestiae, nemo
            incidunt dolor id, fugiat quae porro sed excepturi perspiciatis
            obcaecati beatae quidem recusandae. Labore obcaecati asperiores,
            dolorum magni aperiam optio, earum porro tempore saepe quo facere,
            eaque soluta. Quibusdam omnis at facere culpa officiis hic, harum
            cupiditate ab distinctio, unde numquam adipisci saepe. Dolore nobis
            totam commodi! Officia illum fugit dolorum hic doloribus velit
            architecto, ducimus excepturi a praesentium voluptatibus perferendis
            consequuntur maxime unde quaerat eum non? Quam delectus ipsum
            explicabo reiciendis quibusdam enim, quod recusandae amet. Accusamus
            tenetur laboriosam similique, illum et dignissimos iste culpa
            architecto voluptatibus maiores nam maxime amet. Quibusdam ipsa est
            eligendi ipsam explicabo quidem fugit deleniti sint assumenda amet.
            Temporibus, nemo laudantium quisquam tempora quae nisi ad, quasi,
            dolorum natus iste maiores dicta.
          </div>
          <Form.Item
            name="accept_terms_and_conditions"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "โปรดยอมรับข้อตกลงและเงื่อนไข",
              },
            ]}
            style={{ marginTop: "1rem" }}
          >
            <Checkbox
              defaultChecked={false}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            >
              ยอมรับข้อตกลงและเงื่อนไข
            </Checkbox>
          </Form.Item>
        </div>
      </div>
      <div className="mt-4 flex gap-x-2">
        <Button
          type="default"
          htmlType="button"
          size="large"
          onClick={backStep}
        >
          ย้อนกลับ
        </Button>
        <Popconfirm
          placement="topLeft"
          title="ยืนยันการเปิดร้านค้า"
          description="กรุณาตรวจสอบข้อมูลให้ถูกต้อง"
          okText="ยืนยัน"
          cancelText="ยกเลิก"
          onConfirm={onConfirm}
          onCancel={() => {}}
        >
          <Button
            type="primary"
            htmlType="button"
            size="large"
            disabled={!checked}
          >
            เปิดร้านค้า
          </Button>
        </Popconfirm>
      </div>
    </Form>
  );
};

export default CreateShopStep2Form;
