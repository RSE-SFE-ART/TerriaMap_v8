import React, { useState, useEffect } from "react";
import Rosavento from "./Rosavento";
import { data as datadefault } from "./data_zero";
import TabFrequenzeRosa from "./TabFrequenzeRosa2download";
import { useTranslation } from "react-i18next";
// import PropTypes from "prop-types";

// const RosaventoContainer = (props: { viewState: any; template: any; feature: { _data: { properties: { id_cella: any; lat: string; long: string; quota: string; onshore: string}; }; }; position: any; catalogItem: { uniqueId: any; name: any; }; }) => {
const RosaventoContainer = (props: any) => {
  console.log("RosaventoContainer", props);
  // console.log("props.viewState",props.viewState);
  // console.log("props.template",props.template);
  // console.log("props.feature",props.feature);
  console.log("props.feature._data.properties", props.feature._data.properties);
  // console.log("props.position",props.position);
  // console.log("props.catalogItem",props.catalogItem);
  // console.log("props.feature._data",props.feature._data);
  console.log(
    "id idcella",
    props.feature._data.id,
    props.feature._data.properties.id_cella
  );
  console.log(
    "id id_wrf",
    props.feature._data.id,
    props.feature._data.properties.id_wrf
  );

  const { t } = useTranslation();

  // let numidRosa = Number(props.feature._data.properties.id_cella);
  let numidRosa = Number(props.feature._data.properties.id_wrf);
  const lat = props.feature._data.properties.lat;
  const long = props.feature._data.properties.long;
  const quota = props.feature._data.properties.quota;
  const onshore = props.feature._data.properties.onshore;
  let numlevel = 1;
  let renderOK: boolean = false;
  let altezza = "50";
  const catalogItemUniqueId = props.catalogItem.uniqueId;
  const catalogItemName = (props.catalogItem && props.catalogItem.name) || "";

  if (
    catalogItemUniqueId == "eo_speed10_onshore" ||
    catalogItemUniqueId == "eo_speed10_offshore"
  ) {
    numlevel = 0;
    renderOK = true;
    altezza = "10";
  }
  if (
    catalogItemUniqueId == "eo_speed50_onshore" ||
    catalogItemUniqueId == "eo_speed50_offshore"
  ) {
    numlevel = 1;
    renderOK = true;
    altezza = "50";
  }
  if (
    catalogItemUniqueId == "eo_speed75_onshore" ||
    catalogItemUniqueId == "eo_speed75_offshore"
  ) {
    numlevel = 2;
    renderOK = true;
    altezza = "75";
  }
  if (
    catalogItemUniqueId == "eo_speed100_onshore" ||
    catalogItemUniqueId == "eo_speed100_offshore"
  ) {
    numlevel = 3;
    renderOK = true;
    altezza = "100";
  }
  if (
    catalogItemUniqueId == "eo_speed125_onshore" ||
    catalogItemUniqueId == "eo_speed125_offshore"
  ) {
    numlevel = 4;
    renderOK = true;
    altezza = "125";
  }
  if (
    catalogItemUniqueId == "eo_speed150_onshore" ||
    catalogItemUniqueId == "eo_speed150_offshore"
  ) {
    numlevel = 5;
    renderOK = true;
    altezza = "150";
  }

  let basefilenameout =
    t("rosaDeiVenti.info") + `${onshore == "1" ? "onshore" : "offshore"}`;
  // `Rosa dei venti ` + `${onshore == "1" ? "onshore" : "offshore"}`;
  basefilenameout +=
    ` ${altezza} m s.l.` +
    `${onshore == "1" ? "t" : "m"}` +
    ` - Lat ${lat} Lon ${long}`;
  // console.log('basefilenameout',basefilenameout)
  // console.log("idpunto level catalogItemName onshore", numidRosa, numlevel, catalogItemName, onshore);

  const [datirosa, setdatiRosa] = useState(datadefault);
  const [miakey, setmiakey] = useState(1);
  const [errore, seterrore] = useState(false);
  const [mostraTabella, setmostraTabella] = useState(false);

  async function getRosa(
    idR: number,
    idmin: number,
    idmax: number,
    level: number
  ) {
    // console.log('getRosa', idR, level)
    if (idR < idmin || idR > idmax) {
      seterrore(true);
      throw new Error("id non valido!");
    }
    if (level < 0 || level > 5) {
      seterrore(true);
      throw new Error("livello non valido!");
    }
    // const response = await fetch(`http://localhost:3002/rosa/${idR}?lev=${level}`)
    // const response = await fetch(`http://kawau.ricerca.lan:5001/rosa/${idR}?lev=${level}`);
    const response = await fetch(
      `https://aeolian-api.rse-web.it/rosa/${idR}?lev=${level}`
    );
    if (response.status !== 200) {
      // Lo status nella response dice se l'endpoint esiste davvero.
      throw new Error("cannot fetch the data");
    }
    // console.log(response)
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getRosa(numidRosa, 1, 861273, numlevel) //id valido tra 1-861273
      .then(data => {
        // console.log('resolved:', numidRosa, numlevel, data.chartData[2]);
        setdatiRosa(data);
        incmiakey();
        seterrore(false);
        // console.log('NONerrore2:', errore.valueOf());
      })
      .catch(err => {
        seterrore(true);
        // console.log("err:", err);
        // console.log("errore:", errore.valueOf());
      });
    // console.log('FineuseEffect',idRosa, datirosa.chartData[0])
  }, [numidRosa, numlevel]);

  const incmiakey = () => {
    setmiakey(miakey + 1);
  };
  const myComponentStyle = { maxWidth: "400px" };
  const datiTabella = {
    datirosa: datirosa,
    quota: quota,
    lat: lat,
    long: long
  };

  // function renderOutput(renderOK: boolean) {
  const renderOutput = (renderOK: boolean) => {
    if (renderOK) {
      return (
        <>
          <div
            style={myComponentStyle}
            onClick={() => setmostraTabella(!mostraTabella)}
          >
            {/* <h1>{catalogItemName} Wind Rose Chart - punto {numidRosa} - level {numlevel}</h1> */}
            {/* <p>{catalogItemName}</p>
            <p>Lat {lat} - Lon {long} (quota {quota} m)</p> */}
            <h4>{basefilenameout}</h4>
            {errore.valueOf() && <h4>errore: punto o livello non corretto</h4>}

            <h3>{t("rosaDeiVenti.avvertenza")}</h3>
            <p>
              {mostraTabella
                ? t("rosaDeiVenti.msgNascondi")
                : t("rosaDeiVenti.msgMostra")}
            </p>
            <Rosavento key={miakey} datirosa={datirosa} />
          </div>
          <div>
            <TabFrequenzeRosa
              mostra={mostraTabella}
              datiTabella={datiTabella}
              viewState={props.viewState}
              baseFilename={basefilenameout}
            />
          </div>
        </>
      );
    } else {
      return <div></div>;
    }
  };

  return renderOutput(renderOK);
};

// RosaventoContainer.propTypes = {
//   data: PropTypes.object,
//   name: PropTypes.string,
//   viewState: PropTypes.object,
//   canUseDataUri: PropTypes.bool,
//   t: PropTypes.func
// }

export default RosaventoContainer;
