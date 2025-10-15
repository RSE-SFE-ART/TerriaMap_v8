// lib/Views/AppModalHost.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

/**
 * Custom global modal host — no Terria dependencies.
 *
 * Usage:
 *   window.openAppModal(<MyComponent />, { width, maxHeight })
 *   window.closeAppModal()
 */
export default function AppModalHost() {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    // global helpers
    window.openAppModal = (node, opts = {}) => {
      const { width = "min(95vw, 1000px)", maxHeight = "90vh" } = opts;
      setContent(node);
      setStyle({ width, maxHeight });
      setIsVisible(true);
    };
    window.closeAppModal = () => setIsVisible(false);

    return () => {
      delete window.openAppModal;
      delete window.closeAppModal;
    };
  }, []);

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "8vh"
      }}
      onClick={() => window.closeAppModal()}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 0 15px 6px rgba(100,100,100,.3)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          ...style
        }}
      >
        {content}
      </div>
    </div>,
    document.body
  );
}
