import React, { useCallback } from "react";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const useDeleteConfirm = () => {
  const showDeleteConfirm = useCallback(
    (onOk: () => void, onCancel: () => void, title = "", description = "") => {
      confirm({
        title: title,
        icon: <ExclamationCircleFilled />,
        content: description,
        okText: "ยืนยัน",
        okType: "primary",
        cancelText: "ยกเลิก",
        onOk() {
          onOk();
        },
        onCancel() {
          onCancel();
        },
      });
    },
    []
  );

  return showDeleteConfirm;
};

export default useDeleteConfirm;