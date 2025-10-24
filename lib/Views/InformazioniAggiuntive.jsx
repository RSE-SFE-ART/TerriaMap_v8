import React, { useState } from "react";
import PropTypes from "prop-types";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./related-maps.scss";
import classNames from "classnames";

import withTerriaRef from "terriajs/lib/ReactViews/HOCs/withTerriaRef"; //GOF HOC x Ref di aggancio dei punti del Tour

import Stakeholders from "./Stakeholders.jsx"; //Per la versione fatta in stile notifica

import DemoExplorerModal from "./DemoExplorerModal.jsx";
import StakeholdersModal from "./StakeholdersModal.jsx";
import WebinarsModal from "./WebinairsModal.jsx";
import DocumentationModal from "./DocumentationModal.jsx";
import VideosModal from "./VideosModal.jsx";

function InformazioniAggiuntive(props) {
  const dropdownTheme = {
    inner: Styles.dropdownInner,
    icon: "dataCatalog"
  };

  const [isOpen, setIsOpen] = useState(false);

  const analisi = "Additional Information";

  /* STAKEHOLDER IN FORMATO NOTIFICATION (RIMPIAZZATO DAL MODAL POPUP SOTTO)
  const openStakeholdersNotification = e => {
    e?.preventDefault?.();
    const { terria } = props.viewState;

    if (terria?.notificationState?.addNotificationToQueue) {
      terria.notificationState.addNotificationToQueue({
        title: "Stakeholders",
        message: <Stakeholders />,
        confirmText: "Close"
      });
    } else {
      // Fallback for older builds without notificationState
      // eslint-disable-next-line no-console
      console.warn(
        "terria.notificationState.addNotificationToQueue is not available."
      );
      alert("Stakeholders (notification not available in this build).");
    }
  };
  */

  const openDocumentation = e => {
    e.preventDefault();
    setIsOpen(false);

    const tabs = [
      {
        id: "gr",
        label: "Greece",
        render: () => <DocumentationModal onlyCategory="Greece" />
      },
      {
        id: "it",
        label: "Italy",
        render: () => <DocumentationModal onlyCategory="Italy" />
      },
      {
        id: "sp",
        label: "Spain",
        render: () => <DocumentationModal onlyCategory="Spain" />
      },
      {
        id: "pt",
        label: "Portugal",
        render: () => <DocumentationModal onlyCategory="Portugal" />
      },
      {
        id: "uk",
        label: "United Kingdom",
        render: () => <DocumentationModal onlyCategory="UK" />
      }
    ];

    window.openAppModal(
      <DemoExplorerModal
        key={`documents-${Date.now()}`}
        title="Documentation Catalog"
        tabs={tabs}
      />
    );
  };

  const openStakeholdersModal = e => {
    e.preventDefault();
    setIsOpen(false);

    const tabs = [
      {
        id: "academia",
        label: "Academia",
        render: () => <StakeholdersModal onlyCategory="Academia" />
      },
      {
        id: "civil-society",
        label: "Civil Society",
        render: () => <StakeholdersModal onlyCategory="Civil Society" />
      },
      {
        id: "green-innovation",
        label: "Green Innovation",
        render: () => <StakeholdersModal onlyCategory="Green Innovation" />
      },
      {
        id: "industry",
        label: "Industry",
        render: () => <StakeholdersModal onlyCategory="Industry" />
      },
      {
        id: "public-authorities",
        label: "Public Authorities",
        render: () => <StakeholdersModal onlyCategory="Public Authorities" />
      }
    ];

    window.openAppModal(
      <DemoExplorerModal
        key={`stakeholders-${Date.now()}`}
        title="Stakeholders Database"
        tabs={tabs}
      />
    );
  };

  const openWebinars = e => {
    e.preventDefault();
    setIsOpen(false);

    const tabs = [
      { id: "webinars", label: "Webinars", render: () => <WebinarsModal /> }
    ];
    window.openAppModal(
      <DemoExplorerModal
        key={`webinars-${Date.now()}`}
        title="Webinars"
        tabs={tabs}
      />
    );
  };

  const openVideos = e => {
    e.preventDefault();
    setIsOpen(false);

    const tabs = [
      {
        id: "en",
        label: "English",
        render: () => <VideosModal onlyLang="en" />
      },
      {
        id: "gr",
        label: "Greek Sub",
        render: () => <VideosModal onlyLang="gr" />
      },
      {
        id: "it",
        label: "Italian Sub",
        render: () => <VideosModal onlyLang="it" />
      },
      {
        id: "es",
        label: "Spanish Sub",
        render: () => <VideosModal onlyLang="es" />
      },
      {
        id: "pt",
        label: "Portuguese Sub",
        render: () => <VideosModal onlyLang="pt" />
      }
    ];

    window.openAppModal(
      <DemoExplorerModal
        key={`videos-${Date.now()}`}
        title="Videos"
        tabs={tabs}
      />
    );
  };

  return (
    <MenuPanel
      btnRef={props.refFromHOC} //GOF   Ref sul bottone per il Tour
      theme={dropdownTheme}
      btnText={analisi}
      smallScreen={props.smallScreen}
      viewState={props.viewState}
      btnTitle={analisi}
      isOpen={isOpen}
      onOpenChanged={setIsOpen}
    >
      {/* titolo della pagina */}
      <div className={classNames(PanelStyles.header)}>
        <label className={PanelStyles.heading}>
          {/* <h1> Navigate among the supplementary tools</h1> */}
        </label>
      </div>

      {/* body */}
      <div className={classNames(PanelStyles.section, Styles.section)}>
        <ul className="list-group list-group-flush">
          <table>
            <tbody>
              <tr>
                <td colSpan="2">
                  <h2>DOCUMENTATION CATALOG</h2>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    className={Styles.image}
                    src={require("../../wwwroot/images/documentation_image.png")}
                    alt="Documentation"
                  />
                </td>
                <td>
                  <p align="justify">
                    Consult concise documentation on best practices,
                    recommendations, financing solutions, guidelines, and
                    environmental assessments to support information exchange
                    among stakeholders and to support decision-making processes.
                  </p>
                  <br />
                  <a
                    href="#"
                    className={Styles.link}
                    onClick={openDocumentation}
                  >
                    Work in progress
                  </a>
                </td>
              </tr>

              <tr>
                <td colSpan="2">
                  <h2>STAKEHOLDERS DATABASE</h2>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    className={Styles.image}
                    src={require("../../wwwroot/images/marinewind_stakeholders.png")}
                    alt="Stakeholders"
                  />
                </td>
                <td>
                  <p align="justify">
                    This tool provides access to a database of potential
                    stakeholders involved in the offshore wind sector. For
                    further details, please contact the respective stakeholder
                    directly.
                  </p>
                  <br />
                  <a
                    href="#"
                    className={Styles.link}
                    onClick={openStakeholdersModal}
                  >
                    Open Stakeholders
                  </a>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <h2>WEBINARS</h2>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    className={Styles.image}
                    src={require("../../wwwroot/images/marinewind_webinairs.png")}
                    alt="Webinars"
                  />
                </td>
                <td>
                  <p align="justify">
                    Watch recordings and explore presentation slides from
                    MarineWind webinars, where industry experts share their
                    experience and discuss current topics in the offshore wind
                    sector.
                  </p>
                  <br />
                  <a href="#" className={Styles.link} onClick={openWebinars}>
                    Browse Webinars
                  </a>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <h2>VIDEOS</h2>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    className={Styles.image}
                    src={require("../../wwwroot/images/marinewind_videos.png")}
                    alt="Videos"
                  />
                </td>
                <td>
                  <p align="justify">
                    Watch videos about the MarineWind Project. Videos are
                    available with subtitles in Greek, Italian, Spanish and
                    Portuguese!
                  </p>
                  <br />
                  <a href="#" className={Styles.link} onClick={openVideos}>
                    Browse Videos
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </ul>
      </div>
    </MenuPanel>
  );
}

InformazioniAggiuntive.propTypes = {
  viewState: PropTypes.object.isRequired,
  smallScreen: PropTypes.bool
};

//export default InformazioniAggiuntive;
export const TOOLS_PANEL_NAME = "MenuBarInformationButton"; //GOF
export default withTerriaRef(InformazioniAggiuntive, TOOLS_PANEL_NAME); //GOF esporto AnalisiAvanzate con il Ref x il Tour
