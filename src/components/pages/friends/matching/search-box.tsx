"use client";
import { Button, DatePicker, DatePickerProps, Form } from "antd";
import { useState } from "react";
import {
  IoFemaleOutline,
  IoLocationOutline,
  IoMaleOutline,
  IoTransgenderOutline,
} from "react-icons/io5";
import {
  SearchOutlined,
  StarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import EventCard from "../../events/event-card";
import eventList from "@/data/mock/event-list.json";

const dateFormat = "YYYY/MM/DD";
const TagFilterLists = [
  { tag_en: "all", tag_th: "ทั้งหมด" },
  { tag_en: "near_me", tag_th: "ใกล้ฉัน", Icon: IoLocationOutline },
  { tag_en: "male", tag_th: "ชาย", Icon: IoMaleOutline },
  { tag_en: "female", tag_th: "หญิง", Icon: IoFemaleOutline },
  { tag_en: "lgbtq+", tag_th: "LGBTQ+", Icon: IoTransgenderOutline },
  { tag_en: "contest", tag_th: "ประกวด", Icon: TrophyOutlined },
  { tag_en: "show", tag_th: "แสดงเวที", Icon: StarOutlined },
];

const CustomTag = ({
  tag,
  selected,
  Icon,
  onClick,
}: {
  tag: string;
  selected: boolean;
  Icon?: React.ElementType;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={() => onClick()}
      className={`px-3 py-1 bg-primary-100 border-2 ${
        selected ? "border-primary-300" : "border-primary-100"
      } rounded-xl flex  ${selected ? "text-primary-600" : "text-primary-400"}`}
    >
      {Icon && (
        <span className="text-xl my-auto mr-2">
          <Icon />
        </span>
      )}
      <p className={`text-lg`}>{tag}</p>
    </button>
  );
};

const SearchBox = () => {
  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState<string[]>(["all"]);
  const onSelectTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  return (
    <div className="bg-primary-50 border border-primary-200 px-4 py-2 rounded-xl text-primary-600">
      <h4 className="mb-2">ค้นหา Cosplayer</h4>
      <Form layout="vertical">
        <div className="flex flex-wrap gap-2 my-2">
          {TagFilterLists.map(({ tag_en, tag_th, Icon }) => (
            <CustomTag
              key={tag_en}
              tag={tag_th}
              selected={selectedTags.includes(tag_en)}
              onClick={() => onSelectTag(tag_en)}
              Icon={Icon}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 mt-4">
          <Form.Item
            name="date"
            label="อนิเมะ ภาพยนตร์ หรือซีรีย์ที่สนใจคอสเพลย์"
          >
            <DatePicker.RangePicker
              size="large"
              placeholder={["วันแรก", "วันสุดท้าย"]}
              defaultValue={[
                dayjs("2015/01/01", dateFormat),
                dayjs("2015/01/01", dateFormat),
              ]}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item name="date" label="ช่วงวันที่คอสเพลย์">
            <DatePicker.RangePicker
              size="large"
              placeholder={["วันแรก", "วันสุดท้าย"]}
              defaultValue={[
                dayjs("2015/01/01", dateFormat),
                dayjs("2015/01/01", dateFormat),
              ]}
              format={dateFormat}
            />
          </Form.Item>
        </div>
        <label className="text-lg">เลือกจากผู้ที่สนใจเข้าร่วมกิจกรรม</label>
        <div
          className="flex w-full max-w-full overflow-x-scroll overflow-y-hidden gap-2 p-2"
          id="search-box-event-container"
        >
          {eventList.map((event, index) => (
            <EventCard
              key={index}
              name={event.name}
              location={event.location}
              start_date={event.start_date}
              end_date={event.end_date}
              image_cover={event.image_cover}
            />
          ))}
        </div>
        <div className="mt-4 mb-2">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<SearchOutlined />}
          >
            ค้นหา Cosplayer
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchBox;
