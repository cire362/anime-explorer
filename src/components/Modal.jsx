import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "../styles/modal.css";

export default function Modal({ children, func }) {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <div onClick={(e) => func(e)} className="modal-overlay">
      <div className="modal">{children}</div>
    </div>,
    elRef.current,
  );
}
