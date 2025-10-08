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
import InformazioniAggiuntive from "./InformazioniAggiuntive";
import SplitPoint from "terriajs/lib/ReactViews/SplitPoint";
import StandardUserInterface from "terriajs/lib/ReactViews/StandardUserInterface/StandardUserInterface.jsx";
import version from "../../version";

import "./global.scss";

export default function UserInterface(props) {
  return (
    <>
      <StandardUserInterface {...props} version={version}>
        <MenuLeft>
          <MenuItem caption="About" href="about.html" key="about-link" />
          <AnalisiAvanzate viewState={props.viewState} />
          <InformazioniAggiuntive viewState={props.viewState} />
        </MenuLeft>
      </StandardUserInterface>
    </>
  );
}

UserInterface.propTypes = {
  terria: PropTypes.object,
  viewState: PropTypes.object
};
