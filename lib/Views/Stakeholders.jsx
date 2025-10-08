import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx/dist/xlsx.mini.min.js";
import Styles from "./stakeholders.scss";
import classNames from "classnames";

const EXCEL_URL = "/data/stakeholders.xlsx";

const CANON_ORDER = [
  "Academia",
  "Civil Society",
  "Green Innovation",
  "Industry",
  "Public Authorities"
];

// Questo mi rimanda quelli con categorie strane (o con doppioni) nella categoria giusta e uniforma alle 5 categorie stabilite
function normalizeCategory(raw) {
  if (!raw || String(raw).trim() === "") return "Civil Society";
  let s = String(raw)
    .toLowerCase()
    .trim();
  const slash = s.indexOf("/");
  if (slash !== -1) s = s.slice(0, slash).trim();
  s = s.replace(/\s+/g, " ");
  if (s === "uncategorized" || s === "(uncategorized)") return "Civil Society";
  if (s.startsWith("academ")) return "Academia";
  if (s.startsWith("civil")) return "Civil Society";
  if (
    s.startsWith("green innov") ||
    s === "green innovation" ||
    s === "green innovations"
  )
    return "Green Innovation";
  if (s.includes("operator") || s.includes("supply chain") || s === "industry")
    return "Industry";
  if (
    s.startsWith("public") ||
    s.startsWith("policy") ||
    s.includes("policy/reg") ||
    s.includes("regulatory")
  )
    return "Public Authorities";
  return "Civil Society";
}

const catSlug = label => label.toLowerCase().replace(/\s+/g, "-"); //Per il CSS

export default function Stakeholders() {
  const [openId, setOpenId] = useState(null); //Qual è aperta
  const [cats, setCats] = useState(null); //Quali sono caricate
  const [error, setError] = useState(null);

  const demoCats = useMemo(
    //Mette cose a caso come placeholder
    () =>
      CANON_ORDER.map((label, idx) => ({
        id: `cat-${idx + 1}`,
        label,
        rows: Array.from({ length: 5 }, (_r, i) => ({
          f: `${label} demo org ${i + 1}`,
          g: `Country ${i + 1}`
        }))
      })),
    []
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(EXCEL_URL);
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`); //Non trova il file
        const buf = await res.arrayBuffer();

        const wb = XLSX.read(buf, { type: "array" });
        const firstSheetName = wb.SheetNames?.[0]; //Primo foglio
        if (!firstSheetName) throw new Error("Workbook has no sheets");
        const ws = wb.Sheets[firstSheetName];

        const rows = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          range: 3,
          defval: ""
        }); //Saltiamo le prime tre righe
        const COL_B = 1,
          COL_F = 5,
          COL_G = 6;

        const seenF = new Set();
        const grouped = new Map(CANON_ORDER.map(c => [c, []]));

        for (const r of rows) {
          const f = (r[COL_F] ?? "").toString().trim();
          if (!f || seenF.has(f)) continue;
          seenF.add(f);
          const g = (r[COL_G] ?? "").toString().trim();
          const canon = normalizeCategory(r[COL_B]);
          grouped.get(canon).push({ f, g });
        }

        const categories = CANON_ORDER.map((label, idx) => ({
          id: `cat-${idx + 1}`,
          label,
          rows: grouped.get(label) || []
        }));

        if (!cancelled) {
          setCats(categories);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || String(e));
          setCats([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const data = cats && cats.length ? cats : demoCats; //Se non trova le categorie mette i dati demo

  const toggle = id => setOpenId(curr => (curr === id ? null : id)); //Se ne chiude apre una chiude le altre
  const chevron = expanded => (expanded ? "▼" : "▶");

  return (
    <div className={Styles["mw-stakeholders"]}>
      {error && <p style={{ margin: "0 0 10px", color: "crimson" }}>{error}</p>}

      <div className={Styles["mw-grid"]}>
        {data.map(cat => {
          const expanded = openId === cat.id;
          const headerClass = classNames(
            Styles["mw-header"],
            Styles[`mw-cat--${catSlug(cat.label)}`] // Colorazione specifica
          );

          return (
            <div key={cat.id} className={Styles["mw-section"]}>
              <button
                className={headerClass}
                onClick={() => toggle(cat.id)}
                aria-expanded={expanded}
                aria-controls={`panel-${cat.id}`}
              >
                <span className={Styles["mw-chevron"]}>
                  {chevron(expanded)}
                </span>
                <strong className={Styles["mw-title"]}>{cat.label}</strong>
                <span className={Styles["mw-count"]}>{cat.rows.length}</span>
              </button>

              {expanded && (
                <div
                  id={`panel-${cat.id}`}
                  role="region"
                  aria-label={cat.label}
                >
                  <div className={Styles["mw-body"]}>
                    <table>
                      <thead>
                        <tr>
                          <th>Organization / Institution Name</th>
                          <th>Country</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.rows.map((r, i) => (
                          <tr key={`${cat.id}-${i}`}>
                            <td>{r.f}</td>
                            <td>{r.g}</td>
                          </tr>
                        ))}
                        {!cat.rows.length && (
                          <tr>
                            <td colSpan={2} style={{ color: "#666" }}>
                              No entries
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
