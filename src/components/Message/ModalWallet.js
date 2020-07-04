import React from "react";

function ModalWallet({ msg }) {
  return (
    <div
      style={{ backgroundColor: "rgba(0,0,0,0.4", overflow: "visible" }}
      className="fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto"
    >
      {msg}
    </div>
  );
}

export default ModalWallet;
