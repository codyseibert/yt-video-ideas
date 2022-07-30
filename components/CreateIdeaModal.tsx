import { Modal } from "antd"
import NewIdeaForm from "./NewIdeaForm"

export const CreateIdeaModal = (
  { showModal, setShowModal, onIdeaCreated }:
    {
      showModal: boolean,
      setShowModal: (isDisplayed: boolean) => void,
      onIdeaCreated: () => void
    }
) => {

  return <Modal
    title={
      <h2 className="font-semibold text-xl">
        Create A New Awesome Idea 🤩🥳
      </h2>
    }
    centered
    visible={showModal}
    onCancel={() => setShowModal(false)}
    footer={false}
  >
    <NewIdeaForm onIdeaCreated={onIdeaCreated} setShowModal={setShowModal} />
  </Modal>
}