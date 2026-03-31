export default function PanelContainer({ children }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "80px",          // leaves space for options button
        right: "20px",
        bottom: "20px",
        width: "320px",       // ~8cm equivalent
        background: "#333",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        padding: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        zIndex: 5
      }}
    >
      {children}
    </div>
  );
}