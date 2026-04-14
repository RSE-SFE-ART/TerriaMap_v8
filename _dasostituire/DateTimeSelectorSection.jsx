// TerriaMap_v8\node_modules\terriajs\lib\ReactViews\Workbench\Controls\DateTimeSelectorSection.jsx

"use strict";

import dateFormat from "dateformat";

import React from "react";
import createReactClass from "create-react-class";
import classNames from "classnames";
import PropTypes from "prop-types";
import styled from "styled-components";
import { observer } from "mobx-react";

import defined from "terriajs-cesium/Source/Core/defined";
import JulianDate from "terriajs-cesium/Source/Core/JulianDate";

import DateTimePicker from "../../BottomDock/Timeline/DateTimePicker";
import { formatDateTime } from "../../BottomDock/Timeline/DateFormats";
import Styles from "./datetime-selector-section.scss";
import Icon from "../../../Styled/Icon";
import CommonStrata from "../../../Models/Definition/CommonStrata";
import { runInAction } from "mobx";
import { withTranslation } from "react-i18next";
// new per BIGBANG
function formatMonthIntl(date, userLang) {
  if (!date) return "";

  const lang = (userLang || (navigator?.language ?? "en"))
    .toLowerCase()
    .startsWith("it")
      ? "it-IT"
      : "en-GB";

  const month = new Intl.DateTimeFormat(lang, {
    month: "long",
    timeZone: "UTC"
  }).format(date);

  /*   const year = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    timeZone: "UTC"
  }).format(date); */

  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  return `${capitalizedMonth}`;
}

//const locale=month
//end new

const DateTimeSelectorSection = observer(
  createReactClass({
    displayName: "DateTimeSelectorSection",

    propTypes: {
      item: PropTypes.object.isRequired,
      t: PropTypes.func.isRequired
    },

    getInitialState() {
      return {
        isOpen: false
      };
    },

    changeDateTime(time) {
      const item = this.props.item;

      // Give this item focus on the timeline (if it is connected to the timeline), so that the user can select all available dates for this item.
      item.terria.timelineStack.promoteToTop(item);

      runInAction(() => {
        // Set the time on the item, set it to use its own clock, update the imagery and repaint.
        item.setTrait(
          CommonStrata.user,
          "currentTime",
          JulianDate.toIso8601(JulianDate.fromDate(time))
        );
      });
      item.terria.currentViewer.notifyRepaintRequired();
    },

    onTimelineButtonClicked() {
      const item = this.props.item;
      const terria = item.terria;
      if (terria.timelineStack.items.indexOf(item) >= 0) {
        terria.timelineStack.remove(item);
      } else {
        terria.timelineStack.addToTop(item);
      }
      item.terria.currentViewer.notifyRepaintRequired();
    },

    onShowOnChartButtonClicked() {
      const item = this.props.item;
      runInAction(() => {
        item.setTrait(
          CommonStrata.user,
          "showInChartPanel",
          !item.showInChartPanel
        );
      });
    },

    onPreviousButtonClicked() {
      const item = this.props.item;

      // Give this item focus on the timeline (if it is connected to the timeline), so that the user can select all available dates for this item.
      item.terria.timelineStack.promoteToTop(item);

      item.moveToPreviousDiscreteTime(CommonStrata.user);

      // Repaint imagery on layers that don't subscribe to clock changes.
      item.terria.currentViewer.notifyRepaintRequired();
    },

    onNextButtonClicked() {
      const item = this.props.item;

      // Give this item focus on the timeline (if it is connected to the timeline), so that the user can select all available dates for this item.
      item.terria.timelineStack.promoteToTop(item);

      item.moveToNextDiscreteTime(CommonStrata.user);

      // Repaint imagery on layers that don't subscribe to clock changes.
      item.terria.currentViewer.notifyRepaintRequired();
    },

    onOpen() {
      this.setState({
        isOpen: true
      });
    },

    onClose() {
      this.setState({
        isOpen: false
      });
    },

    toggleOpen(event) {
      this.setState({
        isOpen: !this.state.isOpen
      });
      event.stopPropagation();
    },

    render() {
      const { t } = this.props;
      let discreteTime;
      let format;
      const item = this.props.item;
      const discreteTimes = item.discreteTimesAsSortedJulianDates;
      const disableDateTimeSelector = item.disableDateTimeSelector;

      if (
        !defined(discreteTimes) ||
        discreteTimes.length === 0 ||
        disableDateTimeSelector
      ) {
        return null;
      }

      //start modifica per data BIGBANG

      if (defined(item.currentDiscreteJulianDate)) {
        const time = JulianDate.toDate(item.currentDiscreteJulianDate);

        const browserLang =
          (typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage)) || "en";
        const isItalian = browserLang.toLowerCase().startsWith("it");
        const formatString = item.dateFormat; // nel catalog hai "dateFormat": "mmmm"

        if (formatString === "mmmm" && isItalian) {
          // Solo mese, localizzato in italiano
          discreteTime = formatMonthIntl(time, browserLang);
          format="mmmm";
          //format = formatDate("mmmm", locale);
        } else if (defined(formatString)) {
          // Rispetta qualsiasi altro dateFormat configurato (compreso "mmmm" ma lingua non IT)
          discreteTime = dateFormat(time, formatString);
          format = formatString;
        } else {
          // Fallback standard Terria
          discreteTime = formatDateTime(time);
          // opzionale: format = undefined;
        }
      } else {
        // Nessuna data discreta selezionata
        // opzionale: format = undefined;
        discreteTime = undefined;
      }

              /*  if (useItalianMonths) {
                  discreteTime = formatMonthIntl(time, browserLang);
                  format = "mmmm";
                } else if (defined(item.dateFormat)) {
                  format = item.dateFormat;
                  discreteTime = dateFormat(time, item.dateFormat);
                } else {
                  discreteTime = formatDateTime(time);
                } */
      // fine modifica

      const attachedToTimeline = item.terria.timelineStack.contains(item);
      //const addData = t("addData.Time");
      const addData = t("addData.time_");
      //<div className={Styles.title}>Time:</div>

      return (
        <div className={Styles.datetimeSelector}>
          <div className={Styles.title}>{addData}</div>
          <div className={Styles.datetimeSelectorInner}>
            <div className={Styles.datetimeAndPicker}>
              <button
                className={Styles.datetimePrevious}
                disabled={!item.isPreviousDiscreteTimeAvailable}
                onClick={this.onPreviousButtonClicked}
                title={t("dateTime.previous")}
              >
                <Icon glyph={Icon.GLYPHS.previous} />
              </button>
              <button
                className={Styles.currentDate}
                onClick={this.toggleOpen}
                title={t("dateTime.selectTime")}
              >
                {defined(discreteTime)
                  ? discreteTime
                  : t("dateTime.outOfRange")}
              </button>
              <button
                className={Styles.datetimeNext}
                disabled={!item.isNextDiscreteTimeAvailable}
                onClick={this.onNextButtonClicked}
                title={t("dateTime.next")}
              >
                <Icon glyph={Icon.GLYPHS.next} />
              </button>
            </div>
            <div className={Styles.picker} title={t("dateTime.selectTime")}>
              <DateTimePicker
                currentDate={
                  item.currentDiscreteJulianDate === undefined
                    ? undefined
                    : JulianDate.toDate(item.currentDiscreteJulianDate)
                }
                dates={item.objectifiedDates}
                onChange={this.changeDateTime}
                openDirection="down"
                isOpen={this.state.isOpen}
                onOpen={this.onOpen}
                onClose={this.onClose}
                dateFormat={format}
              />
            </div>
            <TimelineButton
              className={classNames(Styles.timelineButton, {
                [Styles.timelineActive]: attachedToTimeline
              })}
              active={attachedToTimeline}
              type="button"
              onClick={this.onTimelineButtonClicked}
              title={t("dateTime.useTimeline")}
            >
              <Icon glyph={Icon.GLYPHS.timeline} />
            </TimelineButton>
            <TimelineButton
              className={classNames(Styles.timelineButton, {
                [Styles.timelineActive]: item.showInChartPanel
              })}
              active={item.showInChartPanel}
              type="button"
              onClick={this.onShowOnChartButtonClicked}
              title={t("dateTime.availableTimeChart")}
            >
              <Icon glyph={Icon.GLYPHS.lineChart} />
            </TimelineButton>
          </div>
        </div>
      );
    }
  })
);

const TimelineButton = styled.button`
  ${props => `
    ${props.active &&
      `
      background-color: ${props.theme.colorPrimary};
      color: ${props.theme.textLight};
      &:hover,
      &:focus {
        color: ${props.theme.textLight};
      }
    `}
  `}
`;

export default withTranslation()(DateTimeSelectorSection);
