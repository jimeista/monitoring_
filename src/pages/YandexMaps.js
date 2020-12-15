import React, { useEffect, useState } from "react";
import { Map, ObjectManager, YMaps } from "react-yandex-maps";

const YandexMaps = ({ mapState, mapData_, setMapData_ }) => {
 const [data, setData] = useState([]);
 const [height, setHeight] = useState("100%");
 const [objectManager, setObjectManagerRef] = useState();

 useEffect(() => {
  setData([]);
  setTimeout(() => {
   setData(mapData_ ?? []);
  }, [200]);
 }, [mapData_]);

 return (
  <YMaps query={{ mode: "debug" }}>
   <Map state={mapState} width="100%" height={height}>
    {data?.length > 0 && (
     <ObjectManager
      instanceRef={(ref) => {
       ref && setObjectManagerRef(ref);
      }}
      objects={{
       openBalloonOnClick: true,
       preset: "islands#blueDotIcon",
      }}
      options={{
       clusterize: false,
       gridSize: 32,
      }}
      clusters={
       {
        // preset: "islands#redClusterIcons",
       }
      }
      defaultFeatures={{ type: "FeatureCollection", features: data }}
      modules={[
       "objectManager.addon.objectsBalloon",
       "objectManager.addon.objectsHint",
       "objectManager.addon.clustersBalloon",
      ]}
     />
    )}
   </Map>
  </YMaps>
 );
};

export default React.memo(YandexMaps);
