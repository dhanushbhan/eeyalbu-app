export default function HomePanel() {
  return (
    <div className="panel-content">
      <div className="panel-section">
        <h2 className="panel-title">Eeyalbu</h2>
        <p className="panel-kicker">
          Understanding landscapes through patterns, relationships and gradients
        </p>
      </div>

      <div className="panel-section panel-section--body">
        <p className="panel-copy">
          Nature communicates through interactions and not words, and to speak her language,
          we must peek into a structure that is very different from how we perceive language.
          To perceive this linguistic meaning in Nature's interactions, we can look at how
          relationships form across scales. In Nature, these interactions occur across a wide
          range of scales, from the microscopic to the macroscopic, and they form a complex web
          of relationships that shape the ecosystem.
        </p>

        <p className="panel-copy">
          Eeyalbu is a Tamil word derived from the root word "Eeyal," which means nature or
          essence, and the suffix "bu," which indicates a state or condition. Eeyalbu refers to
          the inherent qualities and tendencies of something.
        </p>

        <p className="panel-copy">
          The core idea is simple: landscapes and ecological data both tell the same story, but
          in very different ways. One is spatial and visible, the other is abstract and statistical.
          Eeyalbu brings these two together, allowing users to move between the map and the
          underlying ecological relationships in a way that feels natural and intuitive.
        </p>

        <p className="panel-copy">
          This project comes from my master's thesis in the Uttarkashi region shown on the map,
          where I studied how different types of vegetation are spread across the landscape and
          what environmental factors influence them. While the data showed clear patterns, it was
          hard to understand because the map and the analysis felt disconnected. Eeyalbu is built
          to bring them together in a simple and intuitive way.
        </p>

        <p className="panel-copy">
          The tool has three main views. The Home view shows what is on the ground, helping you
          see patterns in the landscape. The Explorer view shows how these patterns relate to
          things like elevation and climate by letting you compare them. The Transect view shows
          why these patterns change by linking what you see on the map to the hidden statistical
          space behind it, and showing how both change together across a line.
        </p>
      </div>
    </div>
  );
}