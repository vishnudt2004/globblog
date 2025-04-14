import Modal from "@/components/atoms/Modal";

function InfoModal({
  children,
  width = "700px",
  maxHeight = "80vh",
  visible,
  setVisible,
}) {
  return (
    <Modal
      width={width}
      maxHeight={maxHeight}
      visible={visible}
      setVisible={setVisible}
    >
      <div
        style={{
          padding: "20px",
        }}
      >
        {children}
      </div>
    </Modal>
  );
}

export default InfoModal;
