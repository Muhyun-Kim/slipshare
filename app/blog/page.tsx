"use client";

import { DocumentPlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import InputModal from "./InputModal";

export default function Blog() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl p-4 pb-10">Blog 📖</h1>
      <button
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <DocumentPlusIcon className="h-12 w-12" />
      </button>
      <div>
        <InputModal show={showModal} onClose={handleCloseModal} />
      </div>
    </div>
  );
}
