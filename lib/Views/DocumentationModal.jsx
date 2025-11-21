import React from "react";

const COUNTRIES = [
  "Marinewind Project Factsheet",
  "Greece",
  "Italy",
  "Spain",
  "Portugal",
  "UK"
];

export default function DocumentationModal({ onlyCategory }) {
  const selected = COUNTRIES.includes(onlyCategory)
    ? onlyCategory
    : COUNTRIES[0];

  const pdfFile =
    selected === "Marinewind Project Factsheet"
      ? `/data/MARINEWIND_Project_2025_Infographic_Factsheet.pdf#navpanes=0`
      : `/data/MARINEWIND_Project_2025_Infographic_${selected}.pdf#navpanes=0`;
  return (
    <div>
      <div>
        <div
          style={{
            maxHeight: "70vh",
            overflow: "auto",
            padding: "1em",
            color: "#333"
          }}
        >
          <iframe
            src={pdfFile}
            title={`${selected} Documentation`}
            width="100%"
            height="600px"
            style={{
              border: "none"
            }}
          >
            This browser does not support PDFs.{" "}
            <a href={pdfFile}>Download PDF</a>
          </iframe>
        </div>
      </div>
    </div>
  );
}
