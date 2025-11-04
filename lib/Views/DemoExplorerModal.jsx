import React, { useState } from "react";
import Header from "./demo-explorer-header.module.scss";
import Tabs from "./demo-explorer-tabs.module.scss";

export default function DemoExplorerModal({
  title = "Modal",
  tabs = [],
  maxHeight = "80vh"
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const Active =
    tabs.find(t => t.id === active)?.render ||
    (() => <p style={{ margin: 0 }}>No content.</p>);

  const showTabs = tabs.length > 1;

  return (
    <div className={`explorer-window ${Header.mwExplorer}`}>
      <div className={Header.header}>
        <div className={Header.title}>{title}</div>
        <button
          className={Header.doneBtn}
          onClick={() => window.closeAppModal?.()}
        >
          Done
        </button>
      </div>

      <div
        className="body"
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight,
          height: "auto",
          overflow: "hidden"
        }}
      >
        {showTabs && (
          <div className={Tabs.navbar}>
            {tabs.map(t => {
              const isActive = active === t.id;
              const modifier = Tabs[catClass(t.id)] || "";
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`${Tabs.tab} ${modifier} ${
                    isActive ? Tabs.active : ""
                  }`}
                  onClick={() => setActive(t.id)}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        )}

        <div
          className={Tabs.content}
          style={{ overflow: "auto", flexGrow: 1, maxHeight: "inherit" }}
        >
          <Active />
        </div>
      </div>
    </div>
  );
}
