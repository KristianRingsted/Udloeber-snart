// OversigtScreen.js
// Appens forside. Viser alle varer i en liste, sorteret så det der udløber
// først står øverst. Herfra kan man tilføje en vare - hurtigt med billede
// eller manuelt - og trykke på en vare for at se detaljer.

import React, { useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Button } from 'react-native';

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
        {/* Miniaturebillede hvis varen har et, ellers en grå firkant */}
        {item.billede ? (
          <Image source={{ uri: item.billede }} style={styles.miniBillede} />
        ) : (
          <View style={styles.miniTom} />
        )}

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
        ListEmptyComponent={
          <Text style={styles.tom}>Ingen varer endnu. Tilføj den første.</Text>
        }
      />

      {/* Den hurtige vej står først, fordi brugerne pegede på at
          indtastning var den største forhindring. */}
      <View style={styles.knapBund}>
        <Button
          title="Tag billede af vare"
          onPress={() => navigation.navigate('HurtigTilfoej')}
        />
      </View>

      <View style={styles.knapAfstand}>
        <Button
          title="Tilføj manuelt"
          color="#888"
          onPress={() => navigation.navigate('Tilfoej')}
        />
      </View>
    </View>
  );
}