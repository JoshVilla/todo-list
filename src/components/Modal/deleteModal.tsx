import { Modal } from "antd";

type Props = {
  onClose: Function;
  open: boolean;
  deleteFunction: Function;
  message: string;
};

const DeleteModal = ({ open, deleteFunction, onClose, message }: Props) => {
  return (
    <Modal
      open={open}
      onCancel={() => onClose(false)}
      title="Confirm Delete"
      onOk={() => {
        deleteFunction();
        onClose(false);
      }}
    >
      {message}
    </Modal>
  );
};

export default DeleteModal;
