import { useUiStore } from "@/store/uiStore";
import { Modal } from "@/components/ui/modal";

function ModalContainer() {
  const { modal, closeModal } = useUiStore();

  return (
    <Modal
      open={modal.open}
      onClose={closeModal}
      title={modal.title}
      className="modal-wide max-w-[95%] lg:max-w-[900px]"
    >
      <div className="modal-content">{modal.content}</div>
    </Modal>
  );
}

export default ModalContainer;
