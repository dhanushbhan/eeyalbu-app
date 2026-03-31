import { useState } from "react";

export default function OptionsMenu({ onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      display: "flex",
      alignItems: "center",
      zIndex: 10
    }}>
      
      {/* EXPANDING MENU */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginRight: open ? "10px" : "0px",
        opacity: open ? 1 : 0,
        transform: open ? "translateX(0)" : "translateX(20px)",
        transition: "all 0.3s ease",
        pointerEvents: open ? "auto" : "none"
      }}>
        <button onClick={() => onSelect("home")}>Home</button>
        <button onClick={() => onSelect("explorer")}>Explorer</button>
        <button onClick={() => onSelect("transect")}>Transect</button>
      </div>

      {/* MAIN CIRCULAR BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "none",
          background: "#333",
          color: "white",
          fontSize: "20px",
          cursor: "pointer"
        }}
      >
        ☰
      </button>

    </div>
  );
}