import React from "react";
import L, { LeafletMouseEvent, Map } from "leaflet";
import useSWR from "swr";
import "leaflet/dist/leaflet.css";
import { fetcher } from "api";
import COUNTRY_QUERY from "queries";
import { Feature, Countries } from "@types";
import {
  promiseToFlyTo,
  trackerFeatureToHtmlMarker,
  geoJsonToMarkers,
  getMapData,
} from "lib";
import { Page, Loading, Error, SEO } from "components/layout";
import LeafletMap from "../components/map/LeafletMap";

const MapPage = () => {
  // fetch countries
  const { data, error } = useSWR<Countries>(COUNTRY_QUERY, fetcher);
  if (!error && !data) return <Loading />;
  if (error) return <Error error={error} />;

  const handleOnMarkerClick = (
    { feature }: { feature: Feature },
    event: LeafletMouseEvent
  ) => {
    const { target } = event;
    const { _map: map } = target;
    const { geometry, properties } = feature;
    const { coordinates } = geometry;
    const { bounds, code } = properties;

    promiseToFlyTo(map, {
      center: [coordinates[1], coordinates[0]],
      zoom: 3,
    });
    if (bounds && code !== "US") {
      const boundsGeoJsonLayer = new L.GeoJSON(bounds);
      const boundsGeoJsonLayerBounds = boundsGeoJsonLayer.getBounds();
      map.fitBounds(boundsGeoJsonLayerBounds);
    }
  };
  // mapeffect
  const mapEffect = ({
    leafletElement,
  }: {
    leafletElement: Map | undefined;
  }) => {
    if (!leafletElement) return;
    const locationsGeoJson = getMapData(data);
    const locationsGeoJsonLayers = geoJsonToMarkers(locationsGeoJson, {
      onClick: handleOnMarkerClick,
      featureToHtml: trackerFeatureToHtmlMarker,
    });
    const bounds = locationsGeoJsonLayers.getBounds();
    locationsGeoJsonLayers.addTo(leafletElement);
    leafletElement.fitBounds(bounds);
  };

  return (
    <Page>
      <SEO title="World Map" />
      <LeafletMap mapEffect={mapEffect} />
    </Page>
  );
};

export default MapPage;
