import React, { useState, useEffect } from "react";

export default function VideosModal({ onlyLang }) {
  const [videosByLang, setVideosByLang] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/data/videos.json?ts=${Date.now()}`);
        if (!res.ok)
          throw new Error(`Failed to load videos.json (${res.status})`);
        const json = await res.json();
        if (!cancelled) setVideosByLang(json);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || String(e));
          setVideosByLang({});
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!videosByLang) return <p>Loading…</p>;
  if (!videosByLang[onlyLang])
    return <p style={{ color: "#666" }}>No videos for {onlyLang}.</p>;

  const videos = videosByLang[onlyLang];

  return (
    <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
      {videos.map(video => {
        const match = video.url.match(/[?&]v=([^&]+)/);
        const videoId = match ? match[1] : video.url.split("/").pop();
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        return (
          <article
            key={video.id}
            style={{
              border: "1px solid #e6e6e6",
              borderRadius: 8,
              padding: 12,
              marginBottom: 12
            }}
          >
            <h3 style={{ margin: "0 0 8px" }}>{video.title}</h3>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: 8
              }}
            >
              <iframe
                src={embedUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%"
                }}
              ></iframe>
            </div>
          </article>
        );
      })}
    </div>
  );
}
