
import React, { useEffect } from "react";

export default function Notification({ message = "", onClose = () => {} }) {
  if (!message) return null; // safe early exit

  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        background: "#4caf50",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: 5,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
}
