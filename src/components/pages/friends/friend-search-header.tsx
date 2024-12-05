import { Button, Dropdown, Input, MenuProps, TabsProps } from 'antd'
import React, { useState } from 'react'
import { FaChevronDown, FaSearch } from 'react-icons/fa'

const items: MenuProps["items"] = [
    { key: "1", label: "เพิ่มเพื่อนล่าสุด" },
    { key: "2", label: "สนทนาล่าสุด" },
    { key: "3", label: "ชื่อ" },
];

const itemsTab: TabsProps["items"] = [
    { key: "1", label: "เพิ่มเพื่อนล่าสุด" },
    { key: "2", label: "สนทนาล่าสุด" },
    { key: "3", label: "ชื่อ" },
];

const FriendSearchHeader = () => {

    const [hoverSort, setHoverSort] = useState(false);

    const [selectedSort, setSelectedSort] = useState("เพิ่มเพื่อนล่าสุด");

    const handleMenuClick = ({ key }: { key: string }) => {
        const selectedItem = items.find((item) => item?.key === key);
        if (selectedItem && "label" in selectedItem) {
            setSelectedSort(selectedItem.label as string);
        }
    };

    return (
        <div className="grid grid-cols-8 my-2">
            <div className="col-span-1">
                <h3 className="text-primary-800">รายชื่อเพื่อน</h3>
            </div>
            <div className="col-span-5 w-full my-auto">
                <Input
                    size="middle"
                    placeholder="ค้นหาชื่อเพื่อน"
                    style={{ borderRadius: 12 }}
                    prefix={<FaSearch />}

                />
            </div>
            <div className="col-span-2 text-right mr-4">
                <div className="hidden lg:block my-auto">
                    <Dropdown
                        onOpenChange={(open) => setHoverSort(open)}
                        menu={{
                            items,
                            onClick: handleMenuClick,
                        }}
                        placement="bottomRight"
                        arrow
                    >
                        <Button type="text">
                            เรียงโดย: {selectedSort}{" "}
                            <FaChevronDown
                                className={`${hoverSort ? "rotate-180" : "rotate-0"
                                    } transition-transform duration-200`}
                            />
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default FriendSearchHeader