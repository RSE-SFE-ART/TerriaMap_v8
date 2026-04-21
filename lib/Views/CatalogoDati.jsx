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
  //var analisi = "Advanced Analysis";
  var catalogo_dati = "Data Catalogue";
  if (userLang === "it-IT" || userLang === "it") {
    totem_link = "/#it_totemweb";
    //analisi = "Analisi Avanzate";
    catalogo_dati = "Catalogo Dati";
  }

  return (
    <MenuPanel
      btnRef={props.refFromHOC} //GOF   Ref sul bottone per il Tour
      theme={dropdownTheme}
      btnText={catalogo_dati}
      smallScreen={props.smallScreen}
      viewState={props.viewState}
      btnTitle={catalogo_dati}
    >
      {/* titolo della pagina */}
      <div className={classNames(PanelStyles.header)}>
        <label className={PanelStyles.heading}>
          <h1> {t("analisiAvanzate.h1navigaTraITool")} </h1>
        </label>
      </div>

      {/* collegamento a mapstore */}
      <div className={classNames(PanelStyles.section, Styles.section)}>
        <ul>
          <table>
            <tr>
              <td colspan="2">
                <h2>{t("analisiAvanzate.GeoportaleEnergiaeTerritorio")}</h2>
              </td>
            </tr>
            <tr>
              <td>
                <a target="_blank" href="https://geoportale.rse-web.it/#/">
                  <img
                    className={Styles.image}
                    src={require("../../wwwroot/images/geo_ET_TrGG.png")}
                    alt="geoportale"
                  />
                </a>
              </td>
              <td>
                <p align="justify">{t("analisiAvanzate.geoportale")}</p>
                <a
                  target="_blank"
                  href="https://geoportale.rse-web.it/#/"
                  className={Styles.link}
                >
                  {" "}
                  {/* href="http://gis2.rse-web.it/mapstore"*/}
                  {t("analisiAvanzate.GeoportaleEnergiaeTerritorio")}
                </a>
              </td>
            </tr>
          </table>
        </ul>
      </div>
      {/* collegamento a DBETA*/}
      <div className={classNames(PanelStyles.section, Styles.section)}>
        <ul>
          <table>
            <tr>
              <td colspan="2">
                <h2>GeoDB ETA</h2>
              </td>
            </tr>
            <tr>
              <td>
                <a target="_blank" href={t("analisiAvanzate.link_dbeta")}>
                  <img
                    className={Styles.image}
                    src={require("../../wwwroot/images/dbeta.png")}
                    alt="WEN"
                  />
                </a>
              </td>
              <td valign="top">
                <p align="justify">{t("analisiAvanzate.dbeta_descrizione")}</p>
                <a
                  target="_blank"
                  href={t("analisiAvanzate.link_dbeta")}
                  className={Styles.link}
                >
                  GeoDB ETA
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
