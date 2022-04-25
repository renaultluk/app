import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import useIDStore from '../utils/useIDStore.js';
import { db } from '../utils/firebase';
import { ref, get, child, set } from 'firebase/database';

import styles from '../styles/pages/ScanCargo.js';

const ScanCargo = () => {
  const IDStore = useIDStore();
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const fetchBatchData = async (index) => {
      const batchRef = ref(db, `batches/pending/${index}`);
        get(batchRef).then((snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val();
                return obj;
            }
            return null;
        })
  }

  const fetchTruckData = async (index) => {
      const truckRef = ref(db, `trucks/${index}`);
        get(truckRef).then((snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val();
                return obj;
            }
            return null;
        })
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    existingBatch = fetchBatchData(data);
    if (existingBatch) {
      existingBatch['truckID'] = IDStore.truckID;
      const batchRef = ref(db, `batches/pending/${data}`);
      set(batchRef, existingBatch).then(() => {
        targetTruck = fetchTruckData(IDStore.truckID);
        
        targetTruck['requiresTemp'] = existingBatch.requiresTemp;
        targetTruck['requiresHumidity'] = existingBatch.requiresHumidity;
        targetTruck['tempLowerBound'] = existingBatch.tempLowerBound;
        targetTruck['tempUpperBound'] = existingBatch.tempUpperBound;
        targetTruck['humidityLowerBound'] = existingBatch.humidityLowerBound;
        targetTruck['humidityUpperBound'] = existingBatch.humidityUpperBound;
        const truckRef = ref(db, `trucks/${IDStore.truckID}`);
        set(truckRef, targetTruck).then(() => {
          alert(`Batch ${data} has been paired with truck ${IDStore.truckID}`);
        })  
      });
    } else {
        alert(`Can't post to firebase`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.pageContainer}>
      <Text>Scan Cargo</Text>
      <BarCodeScanner
        // barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

export default ScanCargo;