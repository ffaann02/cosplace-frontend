import React, { useCallback } from "react";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const useDeleteConfirm = () => {
  const showDeleteConfirm = useCallback(() => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }, []);

  return showDeleteConfirm;
};

const DeleteConfirm = () => {
  const showDeleteConfirm = useDeleteConfirm();

  return (
    <div>
      <button onClick={showDeleteConfirm}>DeleteConfirm</button>
    </div>
  );
};

export default DeleteConfirm;