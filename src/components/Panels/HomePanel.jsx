

export default function HomePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      {/* TOP 1/3 */}
      <div style={{ flex: 1, borderBottom: "1px solid #ddd" }}>
        <h2>Eeyalbu</h2>
        
        <p style={{ marginTop: "6px", fontSize: "19px", opacity: 0.8 }}>
          Understanding landscapes through patterns, relationships and gradients
        </p>
      </div>

      {/* BOTTOM 2/3 */}
      <div style={{ flex: 2, overflowY: "auto" }}>
        <p style={{ marginTop: "6px", fontSize: "12px", opacity: 0.8 }}>
          Nature communicates through interactions and not words, and to speak her language, 
          we must peek into a structure that is very different from how we perceive language. 
          To perceive this ‘linguistic’ meaning in Nature’s interactions. All languages we know
           fundamentally exist for communication or, in other words, interaction. In Nature, these
          interactions occur across a wide range of scales, from the microscopic to the macroscopic, and they form 
          a complex web of relationships that shape the ecosystem.
        </p>
        <p style={{ marginTop: "6px", fontSize: "12px", opacity: 0.8 }}>
          Eeyalbu is a Tamil word derived from the root word 
          "Eeyal," which means nature or essence, and the suffix "bu," which indicates a state or 
          condition. Eeyalbu refers to the inherent qualities and tendencies of something.
        </p>

        <p style={{ marginTop: "6px", fontSize: "12px", opacity: 0.8 }}>
          Eeyalbu is a Tamil word derived from the root word 
          "Eeyal," which means nature or essence, and the suffix "bu," which indicates a state or 
          condition. Eeyalbu refers to the inherent qualities and tendencies of something.
        </p>

        
          
      </div>

    </div>
  );
}