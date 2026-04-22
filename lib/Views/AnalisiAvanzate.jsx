import React from "react";
import PropTypes from "prop-types";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./related-maps.scss";
import classNames from "classnames";

import withTerriaRef from "terriajs/lib/ReactViews/HOCs/withTerriaRef"; //GOF HOC x Ref di aggancio dei punti del Tour
import { Trans, useTranslation, withTranslation } from "react-i18next"; //GOF x traduzione didascalie

function AnalisiAvanzate(props) {
  const { t } = useTranslation(); //GOF x traduzione didascalie

  const dropdownTheme = {
    inner: Styles.dropdownInner,
    icon: "gallery"
  };

  // to select language config.json depending on the browser language
  var userLang = navigator.language || navigator.userLanguage;
  var totem_link = "/#en_totemweb";
  var analisi = "Advanced Analysis";
  if (userLang === "it-IT" || userLang === "it") {
    totem_link = "/#it_totemweb";
    analisi = "Analisi Avanzate";
  }

  return (
    <MenuPanel
      btnRef={props.refFromHOC} //GOF   Ref sul bottone per il Tour
      theme={dropdownTheme}
      btnText={analisi}
      smallScreen={props.smallScreen}
      viewState={props.viewState}
      btnTitle={analisi}
    >
      {/* titolo della pagina */}
      <div className={classNames(PanelStyles.header)}>
        <label className={PanelStyles.heading}>
          <h1> {t("analisiAvanzate.h1navigaTraITool")} </h1>
        </label>
      </div>

      {/* totem */}
      <div className={classNames(PanelStyles.section, Styles.section)}>
        <ul class="list-group list-group-flush">
          <table>
            <tr>
              <td colspan="2">
                <h2> TOTEM </h2>
              </td>
            </tr>
            <tr>
              <td>
                <a target="_blank" href="https://totem.rse-web.it">
                  <img
                    className={Styles.image}
                    src={require("../../wwwroot/images/logo_totem_TrW_new.png")}
                    /*src={require("../../wwwroot/images/totem3_v3.png")}*/
                    alt="totem"
                  />
                </a>
              </td>
              <td>
                <p align="justify">
                  {" "}
                  TOTEM (<i>
                    Territory Overview Tool for Energy Modelling
                  </i>): {t("analisiAvanzate.totem_descrizione")}{" "}
                  {t("analisiAvanzate.perAccedere")}{" "}
                  <a className={Styles.link} href={totem_link}>
                    {t("analisiAvanzate.selezionaprovincia")}
                  </a>
                  .
                  {/* Permette la definizione ed il salvataggio di dati territoriali
              necessari a software di analisi multienergetiche. Prima di
              attivare il tool è necessario selezionare, a partire dal link qui
              di seguito, il <i>territorio provinciale e l'anno </i> in cui se
              vuole effettuare l'analisi.  href="http://rakino.ricerca.lan"*/}{" "}
                </p>
              </td>
            </tr>
          </table>
        </ul>
      </div>
      {/* collegamento a WEN*/}
      <div className={classNames(PanelStyles.section, Styles.section)}>
        <ul>
          <table>
            <tr>
              <td colspan="2">
                <h2>Water-Energy Nexus</h2>
              </td>
            </tr>
            <tr>
              <td>
                <a target="_blank" href={t("analisiAvanzate.link_sankey")}>
                  <img
                    className={Styles.image}
                    src={require("../../wwwroot/images/water-Energy_new.png")}
                    alt="WEN"
                  />
                </a>
              </td>
              <td valign="top">
                <p align="justify">{t("analisiAvanzate.acqua_per_energia")}</p>
                <a
                  target="_blank"
                  href={t("analisiAvanzate.link_sankey")}
                  className={Styles.link}
                >
                  WEN - Water Energy Nexus
                </a>
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

//export default AnalisiAvanzate;
export const TOOLS_PANEL_NAME = "MenuBarToolsButton"; //GOF
export default withTerriaRef(AnalisiAvanzate, TOOLS_PANEL_NAME); //GOF esporto AnalisiAvanzate con il Ref x il Tour
