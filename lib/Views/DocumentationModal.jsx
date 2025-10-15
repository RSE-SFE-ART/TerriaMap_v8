import React from "react";

const COUNTRIES = ["Greece", "Italy", "Spain", "Portugal", "UK"];

export default function DocumentationModal({ onlyCategory }) {
  // simple lookup map for placeholder text per country
  const placeholders = {
    Greece: "Placeholder documentation content for Greece.",
    Italy: "Placeholder documentation content for Italy.",
    Spain: "Placeholder documentation content for Spain.",
    Portugal: "Placeholder documentation content for Portugal.",
    UK: "Placeholder documentation content for the UK."
  };

  const selected = COUNTRIES.includes(onlyCategory)
    ? onlyCategory
    : COUNTRIES[0];

  return (
    <div>
      <div>
        <div
          style={{
            maxHeight: "60vh",
            overflow: "auto",
            padding: "1em",
            color: "#333"
          }}
        >
          <p>{placeholders[selected]}</p>
        </div>
      </div>
    </div>
  );
}
