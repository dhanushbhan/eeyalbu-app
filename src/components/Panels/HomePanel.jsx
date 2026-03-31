export default function HomePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      {/* TOP 1/3 */}
      <div style={{ flex: 1, borderBottom: "1px solid #ddd" }}>
        <h2>Eeyalbu</h2>
      </div>

      {/* BOTTOM 2/3 */}
      <div style={{ flex: 2, overflowY: "auto" }}>
        <p>
          This is the homepage description. Click on the map to explore classes.
        </p>
      </div>

    </div>
  );
}