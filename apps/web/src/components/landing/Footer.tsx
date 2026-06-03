/**
 * Footer — Simple landing page footer.
 *
 * Three-column layout: brand name, nav links, and copyright.
 */

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface-lowest)",
        borderTop: "1px solid var(--outline-variant)",
        padding: "32px",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Left — Brand */}
        <div
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--primary)",
          }}
        >
          WorkTF AI
        </div>

        {/* Center — Links */}
        <div
          style={{
            display: "flex",
            gap: "24px",
          }}
        >
          {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                color: "var(--on-surface-variant)",
                fontSize: "14px",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--on-surface-variant)";
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right — Copyright */}
        <div
          style={{
            fontSize: "14px",
            color: "var(--on-surface-variant)",
          }}
        >
          © 2025 WorkTF AI. High-Trust Intelligence.
        </div>
      </div>
    </footer>
  );
}
