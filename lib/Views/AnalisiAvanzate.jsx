import React, { useState } from "react";
import PropTypes from "prop-types";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./related-maps.scss";
import classNames from "classnames";

function AnalisiAvanzate(props) {
  const dropdownTheme = {
    inner: Styles.dropdownInner,
    icon: "gallery"
  };

  // to select language config.json depending on the browser language
  var userLang = navigator.language || navigator.userLanguage;
  var analisi = "Additional tools";
  //if (userLang === "it-IT" || userLang === "it") {
  //  totem_link = "/#it_totemweb";
  //  analisi = "Analisi Avanzate";
  //}

  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuPanel
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
          {/*<h1> Navigate among the supplementary tools</h1>*/}
        </label>
      </div>

      {/* caso multi energy*/}
      {/* collegamento a WEN*/}
      {/* collegamento a mapstore */}
      <div className={classNames(PanelStyles.section, Styles.section)}>
        <ul class="list-group list-group-flush">
          <table>
            <tr>
              <td colspan="2">
                <h2>OFFSHORE WIND PROJECTS SUBMISSION</h2>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className={Styles.image}
                  src={require("../../wwwroot/images/wind_project_image.png")}
                  alt="Wind Project"
                />
              </td>
              <td>
                <p align="justify">
                  Submit spatial and technical data for new offshore wind
                  project proposals.
                </p>
                <br></br>
                To access
                <a
                  className={Styles.link}
                  href={"/#contribute"}
                  onClick={() => setIsOpen(false)}
                >
                  click here
                </a>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <h2>LCOE Simulation Tool</h2>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className={Styles.image}
                  src={require("../../wwwroot/images/simulation_tool.png")}
                  alt="LCOE"
                />
              </td>
              <td>
                <p align="justify">
                  This tool allows to perform a preliminary technical-economical
                  evaluation of a hypothetical floating offshore wind farm
                  simulating the overall cost of energy production (€/MWh) by
                  forecasting future macroeconomic factors such as inflation,
                  interest rates, electricity prices and operating hours.
                </p>
                <br></br>
                Work in progress
                {/*<a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Styles.link}
                  href={"https://marinewind-lcoe.hosted.york.ac.uk/CF_20.html"}
                >
                  {"Provvisional Link"}
                </a>*/}
              </td>
            </tr>
          </table>
        </ul>
      </div>
    </MenuPanel>
  );
}

AnalisiAvanzate.propTypes = {
  viewState: PropTypes.object.isRequired,
  smallScreen: PropTypes.bool
};

export default AnalisiAvanzate;
