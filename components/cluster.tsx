"use client"

import * as React from 'react';
import Map, {CircleLayer, Layer, MapRef, Marker, Popup, Source, SymbolLayer, ViewStateChangeEvent} from 'react-map-gl';
import { Ref, useMemo } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

let dataUpdate:any;

export default function Cluster() {
    const [dataUrl, setDataUrl] = React.useState(process.env.NEXT_PUBLIC_API_URL + '/current/');
    const [viewState, setViewState] = React.useState({
        latitude: 34.08204765,
        longitude: -118.64411248,
        zoom: 8
      });
    const myMap: any = React.createRef();
    const layerStyle: CircleLayer = {
        id: 'clusters',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
            }
    };
    const countLayer: SymbolLayer = ({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    if (!dataUpdate) {
        dataUpdate = setInterval(() => {
            setDataUrl(process.env.NEXT_PUBLIC_API_URL + '/current/?t=' + new Date().getSeconds());
        }, 1000);
    }

    var zoomEnd = (e: any) => {
        setViewState(e.viewState);
    }

    var clickCluster = (clusterId: number, coordinates: number[]) => {
        myMap.current.getSource('earthquakes').getClusterExpansionZoom(
            clusterId,
            (err:any, zoom:any) => {
                if (err) return;
                myMap.current.easeTo({
                    center: coordinates,
                    zoom: zoom
                });
                setViewState({longitude: coordinates[0], latitude: coordinates[1], zoom: zoom})
            }
        );
    };

    var clickNode = (properties: object) => {
        alert(JSON.stringify(properties).replaceAll(',',",\n"));
    };

    var clickMap = (e: any) => {
        const features = myMap.current.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        if (features && features.length) {
            const clusterId = features[0].properties?.cluster_id;
            if (clusterId) {
                clickCluster(clusterId, features[0].geometry.coordinates)
            }
            else {
                clickNode(features[0].properties);
            }
        }
    }

    return (
        <Map
            initialViewState={viewState}
            id="mymap"
            onClick={clickMap}
            onZoomEnd={zoomEnd}
            ref={myMap as Ref<MapRef>}
            style={{width: 800, height: 600}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}
            >
            <Source cluster={true} id="earthquakes" type="geojson" data={dataUrl}>
                <Layer {...layerStyle} />
                <Layer {...countLayer} />
            </Source>
        </Map>
    );
}