import {
  MenuLeft,
  Nav,
  ExperimentalMenu
} from "terriajs/lib/ReactViews/StandardUserInterface/customizable/Groups";
import MenuItem from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuItem";
import PropTypes from "prop-types";
import React from "react";
import RelatedMaps from "./RelatedMaps";
import Multienergy from "./Multienergy";
import AnalisiAvanzate from "./AnalisiAvanzate";
import CatalogoDati from "./CatalogoDati";
import SplitPoint from "terriajs/lib/ReactViews/SplitPoint";
import StandardUserInterface from "terriajs/lib/ReactViews/StandardUserInterface/StandardUserInterface.jsx";
import version from "../../version";
import { useTranslation } from "react-i18next"; //GOF x traduzione didascalie
import "./global.scss";
import About from "./About.jsx";
import AppModalHost from "./AppModalHost.jsx";

// function loadAugmentedVirtuality(callback) {
//   require.ensure(
//     "terriajs/lib/ReactViews/Map/Navigation/AugmentedVirtualityTool",
//     () => {
//       const AugmentedVirtualityTool = require("terriajs/lib/ReactViews/Map/Navigation/AugmentedVirtualityTool");
//       callback(AugmentedVirtualityTool);
//     },
//     "AugmentedVirtuality"
//   );
// }

// function isBrowserSupportedAV() {
//   return /Android|iPhone|iPad/i.test(navigator.userAgent);
// }

export default function UserInterface(props) {
  const { t } = useTranslation(); //GOF x traduzione link about.html/about-en.html

  return (
    <>
      <StandardUserInterface {...props} version={version}>
        <MenuLeft>
          {/* <MenuItem caption="About" href="about.html" key="about-link" /> 
        <MenuItem
          caption="About"
          href={t("varie.aboutlink")}
          key="about-link"
        />*/}
          <About viewState={props.viewState} />
          <AnalisiAvanzate viewState={props.viewState} />
          <CatalogoDati viewState={props.viewState} />
        </MenuLeft>
        <ExperimentalMenu>
          {/* <If condition={isBrowserSupportedAV()}>
          <SplitPoint
            loadComponent={loadAugmentedVirtuality}
            viewState={props.viewState}
            terria={props.viewState.terria}
            experimentalWarning={true}
          />
        </If> */}
        </ExperimentalMenu>
      </StandardUserInterface>
      <AppModalHost viewState={props.viewState} />
    </>
  );
}

UserInterface.propTypes = {
  terria: PropTypes.object,
  viewState: PropTypes.object
};
