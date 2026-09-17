// TilfoejScreen.js
// Skærm hvor brugeren taster en ny vare ind: navn og antal dage til udløb.

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

import { VareContext } from '../App';
import styles from '../styles/styles';

export default function TilfoejScreen({ navigation }) {
  const { tilfoejVare } = useContext(VareContext);

  // Lokal state til de to inputfelter
  const [navn, setNavn] = useState('');
  const [dage, setDage] = useState('');

  // Kaldes når brugeren trykker Gem
  const gem = () => {
    // Simpel validering, så man ikke kan gemme en tom vare
    if (navn.trim() === '' || dage.trim() === '') {
      Alert.alert('Udfyld begge felter', 'Skriv både et navn og et antal dage.');
      return;
    }

    tilfoejVare(navn.trim(), dage);
    navigation.goBack(); // tilbage til oversigten
  };

  return (
    <View style={styles.side}>
      <Text style={styles.label}>Hvad er det?</Text>
      <TextInput
        style={styles.input}
        placeholder="F.eks. Mælk"
        value={navn}
        onChangeText={setNavn}
      />

      <Text style={styles.label}>Hvor mange dage til det udløber?</Text>
      <TextInput
        style={styles.input}
        placeholder="F.eks. 3"
        value={dage}
        onChangeText={setDage}
        keyboardType="numeric" // giver taltastatur på mobilen
      />

      {/* Knap 2: gemmer varen og går tilbage */}
      <View style={styles.knapAfstand}>
        <Button title="Gem vare" onPress={gem} />
      </View>

      {/* Knap 3: fortryder og går tilbage uden at gemme */}
      <View style={styles.knapAfstand}>
        <Button title="Annuller" color="#888" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}
