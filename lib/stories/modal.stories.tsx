import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Modal, Button } from "../main.ts";
import "../output.css";

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: "Modal",
  tags: ["autodocs"],
  args: { onClose: () => {}, isOpen: false },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [modalIsOpen, setModalIsOpen] = useState(args.isOpen);

    return (
      <>
        <Button onClick={() => setModalIsOpen(true)}>Open modal</Button>

        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <Modal.Header>Header</Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            atque consequuntur esse illum iure laboriosam laborum nam quisquam
            quos ut.
          </Modal.Body>
          <Modal.Footer>Footer</Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const Custom: Story = {
  render: (args) => {
    const [modalIsOpen, setModalIsOpen] = useState(args.isOpen);

    const handleClose = () => {
      setModalIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setModalIsOpen(true)}>Open modal</Button>

        <Modal
          isOpen={modalIsOpen}
          onClose={handleClose}
          showCloseButton={false}
        >
          <Modal.Header>Header</Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            atque consequuntur esse illum iure laboriosam laborum nam quisquam
            quos ut.
          </Modal.Body>
          <Modal.Footer className="flex pt-6 gap-x-2 justify-end">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button>Submit</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
