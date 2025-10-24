import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";

import DemoExplorerModal from "./DemoExplorerModal.jsx";

export default function About(props) {
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
          label: "About",
          render: () => (
            <div
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
                padding: "0.5rem"
              }}
            >
              <h2>About MARINEWIND</h2>

              <p>
                MARINEWIND project is a 36-month Coordination and Support Action
                (CSA) whose primary objective is to identify challenges and
                opportunities to enhance the role of Floating Offshore Wind
                Technology (FOWT) in innovative system-integration solutions.
              </p>

              <p>
                The methodology is based on analyses of MARINEWIND Labs — pilot
                studies in Portugal, the UK, Greece, Spain, and Italy —
                supporting knowledge transfer between established and emerging
                FOWT sites and involving Quintuple Helix stakeholders (industry,
                academia, public authorities, civil society and green
                innovation).
              </p>

              <p>
                The MARINEWIND WebGIS provides specific information on FOWTs by
                stakeholder category, location and policy goals, offering
                recommendations for informed renewable-energy policy and
                improved societal acceptance.
              </p>

              <p>
                The data catalogue organises resources by the five Labs,
                covering boundaries, cartography, FOW areas and projects,
                protected areas, network infrastructure and workshop outcomes.
                European-scale data add environmental and maritime context
                relevant for FOW development.
              </p>

              <p>
                The Additional Tools section allows users to submit spatial and
                technical data for new offshore wind project proposals through
                the Offshore Wind Projects Submission interface.
              </p>

              <p>
                The Additional Information section provides access to supporting
                materials and resources, including a Documentation Catalog,
                Stakeholders Database, Webinars, and Videos produced within the
                project.
              </p>

              {/* Footer buttons */}
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
                  href="https://www.rse-web.it/en/legal-notices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tjs-_buttons__btn tjs-_buttons__btn--small"
                >
                  Legal Notice
                </a>
                <a
                  href="https://www.rse-web.it/en/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tjs-_buttons__btn tjs-_buttons__btn--small"
                >
                  Privacy
                </a>
                <a
                  href="https://www.rse-web.it/en/cookie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tjs-_buttons__btn tjs-_buttons__btn--small"
                >
                  Cookies
                </a>
              </div>
            </div>
          )
        }
      ];

      window.openAppModal(
        <DemoExplorerModal
          key={`about-${Date.now()}`}
          title="About MARINEWIND"
          tabs={tabs}
        />
      );
    };

    buttonEl.addEventListener("click", handleClick);
    return () => buttonEl.removeEventListener("click", handleClick);
  }, []);

  return (
    <MenuPanel
      btnRef={btnRef}
      theme={dropdownTheme}
      btnText="About"
      btnTitle="About MARINEWIND"
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
