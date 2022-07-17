import { Modal } from "antd";
import React, { useState } from "react";
import NewIdeaForm from "./NewIdeaForm";

type Props = {};

const NewIdeaBtn = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-blue-500 border border-blue-300 hover:bg-blue-300 hover:text-white p-2 rounded-md"
      >
        New Idea
      </button>
      <Modal
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
        <NewIdeaForm setShowModal={setShowModal} />
      </Modal>
    </>
  );
};

export default NewIdeaBtn;
