// OversigtScreen.js
// Appens forside. Viser alle varer i en liste, sorteret så det der udløber
// først står øverst. Herfra kan man gå videre til at tilføje en vare
// eller trykke på en vare for at se detaljer.

import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';

import { VareContext } from '../App';
import { dageTilbage } from '../styles/hjaelp';
import styles from '../styles/styles';

export default function OversigtScreen({ navigation }) {
  // Henter varelisten fra context (defineret i App.js)
  const { varer } = useContext(VareContext);

  // Sorterer en kopi af listen, så den oprindelige rækkefølge ikke ændres.
  const sorteredeVarer = [...varer].sort(
    (a, b) => new Date(a.udloeber) - new Date(b.udloeber)
  );

  // Bestemmer hvordan én række i listen skal se ud.
  const visVare = ({ item }) => {
    const dage = dageTilbage(item.udloeber);
    // Varer der udløber inden for 2 dage markeres med en anden farve.
    const erKritisk = dage <= 2;

    return (
      <TouchableOpacity
        style={styles.raekke}
        onPress={() => navigation.navigate('Detalje', { vare: item })}
      >
        <Text style={styles.vareNavn}>{item.navn}</Text>
        <Text style={erKritisk ? styles.dageKritisk : styles.dage}>
          {dage < 0
            ? 'Udløbet'
            : dage === 0
            ? 'I dag'
            : dage === 1
            ? '1 dag'
            : `${dage} dage`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.side}>
      <Text style={styles.overskrift}>Dine varer</Text>

      {/* FlatList er React Natives liste-komponent. Den tegner kun de rækker
          der er synlige på skærmen, og er derfor hurtigere end en ScrollView. */}
      <FlatList
        data={sorteredeVarer}
        keyExtractor={(item) => item.id}
        renderItem={visVare}
        // Vises hvis listen er tom
        ListEmptyComponent={
          <Text style={styles.tom}>Ingen varer endnu. Tilføj den første.</Text>
        }
      />

      {/* Knap 1: navigerer til skærmen hvor man tilføjer en vare */}
      <View style={styles.knapBund}>
        <Button
          title="Tilføj vare"
          onPress={() => navigation.navigate('Tilfoej')}
        />
      </View>
    </View>
  );
}
