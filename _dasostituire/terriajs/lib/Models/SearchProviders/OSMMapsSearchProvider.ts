//terriajs/lib/Models/SearchProviders/OSMMapsSearchProvider
import { runInAction } from "mobx";
import Rectangle from "terriajs-cesium/Source/Core/Rectangle";
import loadJson from "../../Core/loadJson";
import SearchProvider from "./SearchProvider";
import SearchResult from "./SearchResult";
//import Ellipsoid from "terriajs-cesium/Source/Core/Ellipsoid";
import SearchProviderResults from "./SearchProviderResults";
//import CesiumMath from "terriajs-cesium/Source/Core/Math";
import Terria from "../Terria";
import defined from "terriajs-cesium/Source/Core/defined";
import { fromPromise } from "mobx-utils";
import i18next from "i18next";

/**
 * Search provider basato su OpenStreetMap Nominatim
 * Compatibile con TerriaJS 8.1
 */
export default class OsmMapsSearchProvider extends SearchProvider {
  readonly terria: Terria;
  readonly name = "OpenStreetMap";

  getType(): string {
    return "osm";
  }

  constructor(terria: Terria) {
    super();
    this.terria = terria;
    //console.log("OSM SearchProvider istanziato");
  }

  async doSearch(
    searchText: string,
    results: SearchProviderResults
  ): Promise<void> {
    results.results.length = 0;
    results.message = undefined;

    if (!searchText || searchText.length < 3) {
      return;
    }

    const searchPromise = this.performSearch(searchText, results);
    results.resultsCompletePromise = fromPromise(searchPromise);

    await searchPromise;
  }

  private async performSearch(
    searchText: string,
    results: SearchProviderResults
  ): Promise<void> {
    const params = new URLSearchParams({
      q: searchText,
      format: "json",
      limit: "5",
      addressdetails: "1",
      countrycodes: "it"
    });

    const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`;

    let response: any[];

    try {
      response = await loadJson(url);
    } catch (e) {
      console.warn("x OSM search failed", e);
      results.message = i18next.t("viewModels.searchErrorOccurred");
      return;
    }

    if (results.isCanceled) {
      return;
    }

    if (!Array.isArray(response) || response.length === 0) {
      results.message = i18next.t("viewModels.searchNoLocations");
      return;
    }

    const searchResults: SearchResult[] = [];

    for (const item of response) {
      if (!defined(item.lat) || !defined(item.lon)) {
        continue;
      }

      searchResults.push(
        new SearchResult({
          name: item.display_name,
          isImportant: true,
          location: {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon)
          },
          clickAction: createZoomToFunction(this, item)
        })
      );
    }

    runInAction(() => {
      results.results.push(...searchResults);
    });

    if (results.results.length === 0) {
      results.message = i18next.t("viewModels.searchNoLocations");
    }
  }
}

function createZoomToFunction(
  model: OsmMapsSearchProvider,
  resource: any
) {
  const bbox = resource.boundingbox;
  if (!bbox || bbox.length !== 4) {
    return undefined;
  }

  const south = parseFloat(bbox[0]);
  const north = parseFloat(bbox[1]);
  const west = parseFloat(bbox[2]);
  const east = parseFloat(bbox[3]);

  const rectangle = Rectangle.fromDegrees(west, south, east, north);

  return function () {
    model.terria.currentViewer.zoomTo(rectangle);
  };
}
