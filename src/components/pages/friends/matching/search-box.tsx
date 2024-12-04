"use client";
import {
  Button,
  Carousel,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  message,
  Tag,
  Collapse,
  Input,
} from "antd";
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
import Image from "next/image";
import { eventCardDateFormat } from "@/utils/dateformat";
import { divider } from "@/config/theme";
import Finding from "./finding";
import { FaChevronUp } from "react-icons/fa";

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
      type="button"
      onClick={() => onClick()}
      className={`px-3 py-1 bg-primary-100 border-2 ${
        selected ? "border-primary-300" : "border-primary-100"
      } rounded-xl flex  ${selected ? "text-primary-600" : "text-primary-400"}`}
    >
      {Icon && (
        <span className="text-sm md:text-xl my-auto mr-2">
          <Icon />
        </span>
      )}
      <p className={`text-md md:text-lg`}>{tag}</p>
    </button>
  );
};

const SearchBox = ({
  openSearchBox,
  loading,
  setLoading,
  setOpenSearchBox,
  GetCosplayerList,
}: {
  openSearchBox: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setOpenSearchBox: (open: boolean) => void;
  GetCosplayerList: () => void;
}) => {
  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState<string[]>(["all"]);
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);

  const handleEventClick = (event: any) => {
    const isSelected = selectedEvents.some((e) => e.name === event.name);

    if (isSelected) {
      setSelectedEvents(selectedEvents.filter((e) => e.name !== event.name));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };
  const onSelectTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    console.log("Selected tags: ", selectedTags);
    console.log("Selected events: ", selectedEvents);
    GetCosplayerList();
  };

  return (
    <Collapse
      activeKey={openSearchBox ? "1" : ""}
      size="large"
      style={{ position: "relative" }}
      onChange={() => setOpenSearchBox(!openSearchBox)}
    >
      <div className="absolute z-[50] right-4 top-4">
        <FaChevronUp
          className={`text-xl text-primary-600 transition-transform duration-300 ${
            !openSearchBox ? "rotate-0" : "rotate-180"
          }`}
        />
      </div>
      <Collapse.Panel
        header="ค้นหา Cosplayer"
        showArrow={false}
        key="1"
        style={{ padding: 0 }}
      >
        <div className="bg-primary-50 border border-primary-200 px-4 py-2 rounded-xl text-primary-600 relative">
          {loading && <Finding />}
          {/* <h4 className="mb-2">ค้นหา Cosplayer</h4> */}
          <Form layout="vertical" onFinish={onFinish}>
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
            <div className="flex flex-col md:flex-row gap-x-4 mt-4">
              <Form.Item
                name="name_or_title"
                label="อนิเมะ ภาพยนตร์ หรือซีรีย์ที่สนใจคอสเพลย์"
                style={{ width: "100%" }}
              >
                <Input
                  size="large"
                  className="w-full px-2 py-1 border border-primary-200 rounded-lg"
                  placeholder="ชื่ออนิเมะ ภาพยนตร์ หรือซีรีย์"
                />
              </Form.Item>
              <Form.Item
                name="date"
                label="ช่วงวันที่คอสเพลย์"
                style={{ width: "100%" }}
              >
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
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
            <div className="mb-2 border border-primary-200 bg-white px-3 pt-1 pb-2 rounded-lg">
              <label className="text-lg">งาน/กิจกรรมที่เลือก</label>
              <div className="flex flex-wrap gap-2">
                {selectedEvents.map((event) => (
                  <Tag
                    key={event.name}
                    closable
                    onClose={() =>
                      setSelectedEvents(
                        selectedEvents.filter((e) => e.name !== event.name)
                      )
                    }
                  >
                    {event.name}
                  </Tag>
                ))}
                {selectedEvents.length === 0 && <p>ยังไม่มีงานที่เลือก</p>}
              </div>
            </div>
            <Collapse>
              <Collapse.Panel
                header="เลือกจากผู้ที่สนใจเข้าร่วมกิจกรรม"
                key="1"
              >
                <div className="w-full border border-primary-100 bg-white p-3 rounded-lg grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {eventList.map((event, index) => (
                    <div
                      onClick={() => handleEventClick(event)}
                      key={index}
                      className={`bg-white drop-shadow-sm flex flex-col w-full h-[360px] border cursor-pointer ${
                        selectedEvents.some((e) => e.name === event.name)
                          ? "border-[3px] rounded-x"
                          : "border-opacity-50"
                      } hover:border-opacity-100 border-primary-200 rounded transition-all ease-linear duration-150`}
                      id="search-result-card"
                    >
                      <div className="relative w-full h-[200px]">
                        <Image
                          className="object-cover w-full h-full rounded-t"
                          src={event.image_cover || "/images/sad-cat.jpg"}
                          alt="placeholder"
                          layout="fill"
                          objectFit="contain"
                          unoptimized
                        />
                      </div>
                      <div className="pl-2 pt-2 pb-1.5 flex-grow flex flex-col">
                        <h6 className="text-primary-600 font-light text-xs xl:text-sm bg-primary-100 w-fit px-2 py-0.5 rounded-lg">
                          {eventCardDateFormat(
                            event.start_date,
                            event.end_date
                          )}
                        </h6>
                        <h4 className="text-primary-700 font-light ml-0.5">
                          {event.name}
                        </h4>
                        <div className="mt-auto mb-0">
                          <Divider
                            className="bg-secondary-100 col-span-full"
                            style={divider}
                          />
                          <div className="flex mt-1">
                            <IoLocationOutline className="my-auto mr-1 text-primary-800 text-sm" />
                            <h6 className="text-sm text-primary-500 font-light truncate">
                              {event.location}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Collapse.Panel>
            </Collapse>
            <div className="mt-4 mb-2">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SearchOutlined />}
                loading={loading}
              >
                ค้นหา Cosplayer
              </Button>
            </div>
          </Form>
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default SearchBox;
