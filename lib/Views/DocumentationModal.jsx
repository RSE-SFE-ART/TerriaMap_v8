import React from "react";

const COUNTRIES = ["Greece", "Italy", "Spain", "Portugal", "UK"];

export default function DocumentationModal({ onlyCategory }) {
  const selected = COUNTRIES.includes(onlyCategory)
    ? onlyCategory
    : COUNTRIES[0];

  const pdfFile = `/data/infograph_${selected.toLowerCase()}.pdf#navpanes=0`;

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
