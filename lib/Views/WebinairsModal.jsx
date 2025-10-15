import React, { useEffect, useState } from "react";

export default function WebinarsModal() {
  const [items, setItems] = useState(null); // null = loading, []/array = loaded
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/data/webinars.json?ts=${Date.now()}`);
        if (!res.ok)
          throw new Error(`Failed to load webinars.json (${res.status})`);
        const json = await res.json();
        if (!cancelled) setItems(Array.isArray(json) ? json : []);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || String(e));
          setItems([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <p style={{ color: "crimson", margin: 0 }}>{error}</p>;
  if (items === null) return <p style={{ margin: 0 }}>Loading…</p>;
  if (!items.length)
    return <p style={{ margin: 0, color: "#666" }}>No webinars available.</p>;

  return (
    <div style={{ maxHeight: "60vh", overflow: "auto" }}>
      {items.map(w => (
        <article
          key={w.id || w.title}
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12
          }}
        >
          <h3 style={{ margin: "0 0 6px" }}>{w.title}</h3>
          <p style={{ marginTop: 0, whiteSpace: "pre-line" }}>
            {w.description}
          </p>
          <div
            style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}
          >
            {w.recordingUrl && (
              <a
                className="tjs-_buttons__btn tjs-_buttons__btn--primary tjs-_buttons__btn--small"
                href={w.recordingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch recording
              </a>
            )}
            {w.slidesUrl && (
              <a
                className="tjs-_buttons__btn tjs-_buttons__btn--small"
                href={w.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Slides
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
