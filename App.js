import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [analysisId, setAnalysisId] = useState('');
  const [message, setMessage] = useState('');

  // Solicitar permiso para la cámara al cargar el componente
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    submitUrlForAnalysis(data); // Asumiendo que `data` es la URL escaneada
  };

  const virusTotalApiKey = '1bd323102055ecdad5d10b802f0a1ec5ecbecbbee39bc2864bb334e36387ea0d'; // Reemplaza esto con tu clave API real

  async function submitUrlForAnalysis(urlToScan) {
    const formData = new FormData();
    formData.append('url', urlToScan);
  
    try {
      const response = await fetch('https://www.virustotal.com/api/v3/urls', {
        method: 'POST',
        headers: {
          'x-apikey': virusTotalApiKey,
        },
        body: formData
      });
  
      const jsonResponse = await response.json();
  
      // Primero, verifica si jsonResponse contiene la propiedad 'data'
      if (jsonResponse.data && jsonResponse.data.id) {
        const analysisId = jsonResponse.data.id;
        setAnalysisId(analysisId); // Guardamos el analysisId para usarlo después
      } else {
        // Si no hay datos o ID, manejar ese caso
        setMessage('No se encontró el ID de análisis en la respuesta de VirusTotal.');
        console.log(jsonResponse); // Puede ayudar a depurar qué respuesta se está recibiendo
      }
    } catch (error) {
      setMessage(`Error al enviar la URL para análisis: ${error}`);
      console.log(error); // Puede ayudar a depurar el error
    }
  }

  async function getUrlAnalysisReport() {
    try {
      const response = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
        method: 'GET',
        headers: {
          'x-apikey': virusTotalApiKey,
        }
      });

      const jsonResponse = await response.json();
      const hasVirus = jsonResponse.data.attributes.last_analysis_stats?.malicious > 0;
      setMessage(hasVirus ? '¡Alerta! Se detectó un virus.' : 'La URL está limpia, no se detectaron virus.');
    } catch (error) {
      setMessage(`Error al obtener el informe de análisis: ${error}`);
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      {analysisId && (
        <Button title={'Get Analysis Report'} onPress={getUrlAnalysisReport} />
      )}
      <View style={styles.footer}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green',
  },
  message: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center'
  },
});
