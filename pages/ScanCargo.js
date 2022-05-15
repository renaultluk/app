import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import useIDStore from '../utils/useIDStore.js';
import { db } from '../utils/firebase';
import { ref, get, child, set, update } from 'firebase/database';

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
      const batchRef = ref(db, `batches/${index}`);
        get(batchRef).then((snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val();
                return obj;
            }
        })
  }

  const fetchTruckData = async (index) => {
      const truckRef = ref(db, `trucks/${index}`);
        get(truckRef).then((snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val();
                return obj;
            }
            // return null;
        }).catch((error) => {
          console.log(error);
        })
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    
    console.log(data);
    var existingBatch = {};
    get(ref(db, `batches/${data}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const obj = snapshot.val();
        existingBatch = obj;
      }
    }).catch((error) => {
      console.log(error);
    });
    console.log(existingBatch);
    if (existingBatch) {
      const updates = {
        truckID: IDStore.truckID,
      };
      const batchRef = ref(db, `batches/${data}`);
      await update(batchRef, updates).catch((error) => {
        console.log(error);
      });
      const truckUpdates = {
        requiresTemp: existingBatch.requiresTemp,
        requiresHumidity: existingBatch.requiresHumidity,
        tempLowerBound: existingBatch.tempLowerBound,
        tempUpperBound: existingBatch.tempUpperBound,
        humidityLowerBound: existingBatch.humidityLowerBound,
        humidityUpperBound: existingBatch.humidityUpperBound,
      };
      const truckRef = ref(db, `trucks/${IDStore.truckID}`);
      await update(truckRef, truckUpdates).catch((error) => {
        console.log(error);
      });
      const newBatchRef = ref(db, `trucks/${IDStore.truckID}/batches/${data}`);
      await set(newBatchRef, data).catch((error) => {
        console.log(error);
      });
      // targetTruck = fetchTruckData(IDStore.truckID);
      
      // targetTruck['requiresTemp'] = existingBatch.requiresTemp;
      // targetTruck['requiresHumidity'] = existingBatch.requiresHumidity;
      // targetTruck['tempLowerBound'] = existingBatch.tempLowerBound;
      // targetTruck['tempUpperBound'] = existingBatch.tempUpperBound;
      // targetTruck['humidityLowerBound'] = existingBatch.humidityLowerBound;
      // targetTruck['humidityUpperBound'] = existingBatch.humidityUpperBound;
      // if (targetTruck['batches'])
      // {
        //   targetTruck['batches'].push(data);
      // }
      // else
      // {
        //   targetTruck['batches'] = [data];
      // }
      // const truckRef = ref(db, `trucks/${IDStore.truckID}`);
      alert(`Batch ${data} has been paired with truck ${IDStore.truckID}`);
    } else {
      alert(`Can't post to firebase`);
    }
    setScanned(true);
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