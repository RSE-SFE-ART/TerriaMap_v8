// lib/Views/StakeholdersModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx/dist/xlsx.mini.min.js";
import Styles from "./stakeholders.scss"; // CSS Module (same file you already use)

// Excel path (served from wwwroot)
const EXCEL_URL = "/data/stakeholders.xlsx";

// Fixed display order
const CANON_ORDER = [
  "Academia",
  "Civil Society",
  "Green Innovation",
  "Industry",
  "Public Authorities"
];

// Map messy column B values into the 5 buckets (case-insensitive)
function normalizeCategory(raw) {
  if (!raw || String(raw).trim() === "") return "Civil Society"; // Uncategorized -> Civil Society
  let s = String(raw)
    .toLowerCase()
    .trim();

  // if multiple like "civil society / green innovation", take first
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

  // default fallback to keep within 5 cats
  return "Civil Society";
}

/**
 * StakeholdersModal
 * - Designed for use inside your Explorer-style modal (top tabs).
 * - Pass `onlyCategory="Academia"` (etc.) to render a single table for that category.
 * - If `onlyCategory` is omitted, it will default to the first category that has rows,
 *   or "Academia" if none found.
 */
export default function StakeholdersModal({ onlyCategory }) {
  const [cats, setCats] = useState(null); // null = loading; [] or array = loaded
  const [error, setError] = useState(null);

  // Tiny demo in case Excel fails (keeps UI alive)
  const demoCats = useMemo(
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
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const buf = await res.arrayBuffer();

        const wb = XLSX.read(buf, { type: "array" });
        const firstSheetName = wb.SheetNames?.[0];
        if (!firstSheetName) throw new Error("Workbook has no sheets");
        const ws = wb.Sheets[firstSheetName];

        // Rows as arrays; skip first 3 rows (start at Excel row 4)
        // A=0, B=1 (category), F=5 (org name), G=6 (country)
        const rows = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          range: 3,
          defval: ""
        });
        const COL_B = 1,
          COL_F = 5,
          COL_H = 7;

        const seenF = new Set();
        const grouped = new Map(CANON_ORDER.map(c => [c, []]));

        for (const r of rows) {
          const f = (r[COL_F] ?? "").toString().trim();
          if (!f || seenF.has(f)) continue; // require org name, dedupe by F
          seenF.add(f);

          const h = (r[COL_H] ?? "").toString().trim();
          const canon = normalizeCategory(r[COL_B]);

          grouped.get(canon).push({ f, h });
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
          setCats([]); // show demo fallback
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const data = cats && cats.length ? cats : demoCats;

  // pick which category to show
  const selectedLabel =
    onlyCategory && CANON_ORDER.includes(onlyCategory)
      ? onlyCategory
      : data.find(c => c.rows?.length)?.label || CANON_ORDER[0];

  const cat = data.find(c => c.label === selectedLabel);

  return (
    <div className={Styles["mw-stakeholders"]}>
      {error && <p style={{ margin: "0 0 10px", color: "crimson" }}>{error}</p>}

      {!cat ? (
        <p style={{ margin: 0, color: "#666" }}>No entries</p>
      ) : (
        <div className={Styles["mw-section"]}>
          <div
            className={Styles["mw-body"]}
            style={{ maxHeight: "60vh", overflow: "auto" }}
          >
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
                    <td>{r.h}</td>
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
}
