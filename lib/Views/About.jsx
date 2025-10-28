import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import DemoExplorerModal from "./DemoExplorerModal.jsx";

export default function About(props) {
  const { t } = useTranslation();
  const dropdownTheme = {
    inner: PanelStyles.dropdownInner,
    icon: "about"
  };

  const btnRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const buttonEl = btnRef.current;
    if (!buttonEl) return;

    const handleClick = e => {
      e.preventDefault();
      e.stopPropagation();

      const tabs = [
        {
          id: "about",
          label: t("about.title"),
          render: () => (
            <div
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
                padding: "0.5rem"
              }}
            >
              <h2>{t("about.title")}</h2>
              {/* HTML preso dal file originale */}
              <div
                dangerouslySetInnerHTML={{
                  __html: t("about.htmlContent")
                }}
              />
              {/* Footer */}
              <div
                style={{
                  marginTop: 24,
                  borderTop: "1px solid #e6e6e6",
                  paddingTop: 12,
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 10
                }}
              >
                <a
                  href={t("about.legal.url")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tjs-_buttons__btn tjs-_buttons__btn--small"
                >
                  {t("about.legal.title")}
                </a>
                <a
                  href={t("about.privacy.url")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tjs-_buttons__btn tjs-_buttons__btn--small"
                >
                  {t("about.privacy.title")}
                </a>
                <a
                  href={t("about.cookies.url")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tjs-_buttons__btn tjs-_buttons__btn--small"
                >
                  {t("about.cookies.title")}
                </a>
              </div>
            </div>
          )
        }
      ];

      window.openAppModal(
        <DemoExplorerModal
          key={`about-${Date.now()}`}
          title={t("about.title")}
          tabs={tabs}
        />
      );
    };

    buttonEl.addEventListener("click", handleClick);
    return () => buttonEl.removeEventListener("click", handleClick);
  }, [t]);

  return (
    <MenuPanel
      btnRef={btnRef}
      theme={dropdownTheme}
      btnText={"About"}
      btnTitle={t("about.title")}
      isOpen={isOpen}
      onOpenChanged={setIsOpen}
      smallScreen={props.smallScreen}
      viewState={props.viewState}
      forceClosed={true}
    />
  );
}

About.propTypes = {
  viewState: PropTypes.object.isRequired,
  smallScreen: PropTypes.bool
};
