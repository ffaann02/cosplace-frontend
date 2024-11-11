import { useState, useCallback } from "react";
import { Modal } from "antd";

const usePreviewImage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const openPreview = useCallback((src: string) => {
    console.log(src); // Logs the image URL when opening the preview
    setImageSrc(src);
    setIsModalVisible(true);
  }, []);

  const closePreview = useCallback(() => {
    setIsModalVisible(false);
    setImageSrc(null); // Reset the image URL when closing the modal
  }, []);

  const PreviewImageModal = useCallback(
    () => (
      <Modal
        closeIcon
        className="preview-image-modal"
        open={isModalVisible} // Use the open prop instead of visible
        footer={null}
        onCancel={closePreview} // onCancel for closing the modal
        style={{
          top: '25%', // Centers the modal vertically
        }}
      >
        <img src={imageSrc || ""} alt="Preview" style={{ width: "100%" }} />
      </Modal>
    ),
    [isModalVisible, imageSrc, closePreview]
  );

  return { openPreview, PreviewImageModal };
};

export default usePreviewImage;