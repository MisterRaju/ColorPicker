import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF'); // Initial color: white

  const handleColorChange = (color: any) => { //Change this to ANY so to check logging easier
      console.log("Color object from picker:", color);
      //Based on THIS LOG:  grab the hex string to update!
      //example might need like "color.hex", check the color what appears
      //You should change <string> tag from useState() back to hex

        //Update below. VERY IMPORTANT!!!
       const hexColor = color.hex ? color.hex : '#FFFFFF'; //Assign color.hex for demo only
       setSelectedColor(hexColor);  //Then set! Now will work!!!
       //Or alternative which needs "color" as well which should come together.
       //  setSelectedColor(color);   Not needed together if use code snippet code
  };

  const copyToClipboard = async (color: string) => {
    await Clipboard.setString(color);
    alert('Copied to clipboard!');
  };

  const hexToRgb = (hex: string | undefined): string | null => {
      if (!hex) return null;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Color Picker</Text>

      <ColorPicker
        style={styles.colorPicker}
        onColorChange={handleColorChange}  // <------- Use handler instead
        onColorSelected={handleColorChange} //  <-------
        hideSliders={true}
        hideControls={false}
      />

      <View style={styles.colorInfo}>
        <Text>Selected Color: {selectedColor}</Text>
        <Text>RGB: {hexToRgb(selectedColor)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard(selectedColor)}>
          <Text style={styles.buttonText}>Copy Hex</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard(hexToRgb(selectedColor) || "")}>
          <Text style={styles.buttonText}>Copy RGB</Text>
        </TouchableOpacity>
      </View>
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
    width: '90%',
    height: 300,
  },
  colorInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  copyButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;