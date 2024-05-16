import React, { useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { getVendors } from '../../actions/vendor';
import ReactMapGL, { Marker } from 'react-map-gl';
import Supercluster from 'supercluster';
import { Avatar, Paper, Tooltip } from '@mui/material';

const supercluster = new Supercluster({
  radius: 80,
  maxZoom: 25,
});

const ClusterMap = () => {
  const {
    state: { vendors },
    dispatch,
    mapRef,
  } = useValue();
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    getVendors(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const points = vendors.map((vendor) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        vendorId: vendor._id,
        buisnessName: vendor.buisnessName,
        cuisineType: vendor.cuisineType,
        menu: vendor.menu,
        contactInformation: vendor.contactInformation,
        lng: vendor.lng,
        lat: vendor.lat,
        images: vendor.images,
        uPhoto: vendor.uPhoto,
        uName: vendor.uName,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(vendor.lng), parseFloat(vendor.lat)],
      },
    }));
    setPoints(points);
  }, [vendors]);

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef]);

  return (
    <ReactMapGL
      initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
      onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
    >
      {clusters.map((cluster) => {
        const { cluster: isCluster, point_count } = cluster.properties;
        const [longitude, latitude] = cluster.geometry.coordinates;
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
              <div
                className="cluster-marker"
                style={{
                  width: `${10 + (point_count / points.length) * 20}px`,
                  height: `${10 + (point_count / points.length) * 20}px`,
                }}
                onClick={() => {
                  const zoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom,
                    speed: 1,
                  });
                }}
              >
                {point_count}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={`vendor-${cluster.properties.vendorId}`}
            longitude={longitude}
            latitude={latitude}
          >
            <Tooltip title={cluster.properties.uName}>
              <Avatar
                src={cluster.properties.uPhoto}
                component={Paper}
                elevation={2}
              />
            </Tooltip>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
};

export default ClusterMap;
