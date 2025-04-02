import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard'; 
import { ColorPicker } from 'react-native-color-picker';

const App: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF'); 

  const handleColorChange = (color: string) => {
    setSelectedColor(color); 
  };

  const copyToClipboard = (color: string) => {
    Clipboard.setStringAsync(color); 
    Alert.alert('Copied!', `Color ${color} copied to clipboard.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Color Picker</Text>

      <ColorPicker
        onColorSelected={handleColorChange} 
        style={styles.colorPicker}
        hideSliders
      />

      <View style={styles.colorInfo}>
        <Text>Selected Color: {selectedColor}</Text>
      </View>

      <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard(selectedColor)}>
        <Text style={styles.buttonText}>Copy Hex</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  colorPicker: {
    width: 300,
    height: 300,
  },
  colorInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  copyButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
