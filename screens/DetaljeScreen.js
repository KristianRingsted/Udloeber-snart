// DetaljeScreen.js
// Viser én enkelt vare. Herfra kan varen slettes, f.eks. når den er spist.

import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';

import { VareContext } from '../App';
import { dageTilbage, formatDato } from '../styles/hjaelp';
import styles from '../styles/styles';

export default function DetaljeScreen({ route, navigation }) {
  const { sletVare } = useContext(VareContext);

  // Varen sendes med som parameter fra oversigten
  const { vare } = route.params;
  const dage = dageTilbage(vare.udloeber);

  // Sletter varen og går tilbage til oversigten
  const slet = () => {
    sletVare(vare.id);
    navigation.goBack();
  };

  return (
    <View style={styles.side}>
      <Text style={styles.detaljeNavn}>{vare.navn}</Text>

      <Text style={styles.detaljeTekst}>
        Udløbsdato: {formatDato(vare.udloeber)}
      </Text>

      <Text style={dage <= 2 ? styles.dageKritisk : styles.dage}>
        {dage < 0
          ? 'Varen er udløbet'
          : dage === 0
          ? 'Udløber i dag'
          : `Udløber om ${dage} ${dage === 1 ? 'dag' : 'dage'}`}
      </Text>

      {/* Knap 4: sletter varen */}
      <View style={styles.knapAfstand}>
        <Button title="Slet vare" color="#c0392b" onPress={slet} />
      </View>
    </View>
  );
}
