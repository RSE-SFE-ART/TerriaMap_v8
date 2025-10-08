import React from "react";
import PropTypes from "prop-types";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./related-maps.scss";
import classNames from "classnames";

import Stakeholders from "./Stakeholders.jsx";

function InformazioniAggiuntive(props) {
  const dropdownTheme = {
    inner: Styles.dropdownInner,
    icon: "dataCatalog"
  };

  // to select language config.json depending on the browser language
  const userLang = navigator.language || navigator.userLanguage;
  const totem_link = "/#en_totemweb";
  const analisi = "Additional Informations";
  // if (userLang === "it-IT" || userLang === "it") {
  //   totem_link = "/#it_totemweb";
  //   analisi = "Analisi Avanzate";
  // }

  // Handler: open Terria notification with <Stakeholders/>
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

  return (
    <MenuPanel
      theme={dropdownTheme}
      btnText={analisi}
      smallScreen={props.smallScreen}
      viewState={props.viewState}
      btnTitle={analisi}
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
                  <h2>STRUCTURED DOCUMENTATION CATALOG</h2>
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
                  Work in progress
                  {/* <a className={Styles.link} href={"/ #contribute"}>{" click here"}</a> */}
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
                  {/* Trigger to open the Terria notification with your Stakeholders component */}
                  <a
                    className={Styles.link}
                    href="#"
                    onClick={openStakeholdersNotification}
                  >
                    Open Stakeholders list
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

export default InformazioniAggiuntive;
