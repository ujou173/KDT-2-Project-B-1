import {Image, Modal, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MetroCoord from '../model/MetropolitanCoordinate.json';
import addLatLngDate, {
  latLngDeltaDataType,
} from '../model/mapviewInitialRegionData';
import React, {useState} from 'react';
import OpenModalToClickMarker from './openModalToClickMarker';
import MeongOriModal from './MeongOriModal';
import {close} from 'fs';

const GoogleMap = () => {
  const [windowBool, setWindowBool] = useState<boolean>(false);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const latLngDeltaData: latLngDeltaDataType = {
    latitudeDelta: 0.1,
    longitudeDelta: 0.5,
  };

  const openModal = () => {
    setWindowBool(true);
  };

  const closeModal = () => {
    setWindowBool(false);
  };

  const onMapReady = () => {
    setIsMapReady(true);
  };

  const renderLoading = () => {
    return (
      <View style={{flex: 1}}>
        <Text>Loading Map...</Text>
      </View>
    );
  };

  return (
    <>
      {isMapReady ? null : renderLoading()}
      <View style={{flex: 1}}>
        <MapView
          onMapReady={onMapReady}
          style={{
            width: '100%',
            height: '100%',
            minHeight: 800,
            minWidth: 200,
          }}
          provider={PROVIDER_GOOGLE}
          initialRegion={addLatLngDate(MetroCoord.daejeon, latLngDeltaData)}>
          <Marker
            key={Object.keys(MetroCoord.daejeon)[0]}
            coordinate={MetroCoord.daejeon}
            description={'대전 소보로빵'}
            onPress={openModal}>
            <Image
              source={require('../Img/Daejeon_Twigim-soboro-bread.png')}
              style={{width: 70, height: 70}}
            />
          </Marker>
        </MapView>
      </View>
      <MeongOriModal closeModal={closeModal} windowBool={windowBool} />
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={windowBool}
        onRequestClose={closeModal}>
        <Text
          style={{
            fontSize: 30,
            left: 28,
            bottom: '88%',
            zIndex: 3,
            position: 'absolute',
            fontWeight: '800',
          }}>
          {' '}
          오리의 추천 맛집{' '}
        </Text>
        <Image
          source={require('../Img/MeongOri.png')}
          style={{
            width: '70%',
            height: '30%',
            opacity: 0.65,
            backgroundColor: 'rgba(255,255,255,0.9)',
          }}
        />
        <OpenModalToClickMarker closeModal={closeModal} />
      </Modal> */}
    </>
  );
};
export default GoogleMap;
