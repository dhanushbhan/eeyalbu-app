import { useState } from "react";

const CLASS_OPTIONS = [
  { id: 0, label: "West Himalayan Fir" },
  { id: 1, label: "East Himalayan Fir" },
  { id: 2, label: "Barren Land" },
  { id: 3, label: "Broadleaf Deciduous" },
  { id: 4, label: "Himalayan Birch" },
  { id: 5, label: "Deodar" },
  { id: 6, label: "Ladakh Peashrub" },
  { id: 7, label: "Dry Alpine Meadows" },
  { id: 8, label: "Oatgrass" },
  { id: 9, label: "Black Juniper" },
  { id: 10, label: "Alpine sedges" },
  { id: 11, label: "Moist Alpine Meadows" },
  { id: 12, label: "Marsh Meadows" },
  { id: 13, label: "Blue Pine" },
  { id: 14, label: "Oaks" },
  { id: 15, label: "Dwarf Rhododendron" },
  { id: 16, label: "Bell Rhododendron" },
  { id: 17, label: "Water/Cloud" },
  { id: 18, label: "Snow Cover" },
  { id: 19, label: "Temperate Grassy Slopes" }
];

export default function Dropdown({ onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleOption = (option) => {
    let updated;

    if (selected.find((item) => item.id === option.id)) {
      updated = selected.filter((item) => item.id !== option.id);
    } else {
      if (selected.length >= 5) return;
      updated = [...selected, option];
    }

    setSelected(updated);
    onChange(updated);
  };

  const selectedText =
    selected.length === 0
      ? "Select classes"
      : selected.map((s) => s.label).join(", ");

  return (
    <div style={{ marginBottom: "10px" }}>
      
      {/* HEADER (click to open/close) */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "10px",
          border: "1px solid #444",
          borderRadius: "8px",
          cursor: "pointer",
          background: "#222"
        }}
      >
        {selectedText}
      </div>

      {/* DROPDOWN CONTENT */}
      {open && (
        <div
          style={{
            marginTop: "6px",
            maxHeight: "180px",
            overflowY: "auto",
            border: "1px solid #444",
            borderRadius: "8px",
            background: "#111"
          }}
        >
          {CLASS_OPTIONS.map((option) => {
            const isSelected = selected.find((s) => s.id === option.id);

            return (
              <div
                key={option.id}
                onClick={() => toggleOption(option)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  background: isSelected ? "#555" : "transparent"
                }}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}