// HurtigTilfoejScreen.js
// Den hurtige vej til at lægge en vare ind: tag et billede og tryk på en
// af genvejene for holdbarhed. Skærmen er lavet som svar på
// brugerinddragelsen, hvor begge interviewpersoner sagde, at det var for
// meget arbejde at skrive varerne ind manuelt.
// Navn og præcist antal dage er valgfrit, så den hurtige vej stadig er hurtig.

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { VareContext } from '../App';
import styles from '../styles/styles';

export default function HurtigTilfoejScreen({ navigation }) {
  const { tilfoejVare } = useContext(VareContext);

  // Stien til det billede brugeren lige har taget eller valgt
  const [billede, setBillede] = useState(null);

  // Begge felter er valgfrie
  const [navn, setNavn] = useState('');
  const [egneDage, setEgneDage] = useState('');

  // Åbner kameraet. Beder først om lov til at bruge det.
  const tagBillede = async () => {
    const tilladelse = await ImagePicker.requestCameraPermissionsAsync();

    if (!tilladelse.granted) {
      Alert.alert(
        'Ingen adgang til kameraet',
        'Du skal give appen adgang til kameraet i telefonens indstillinger.'
      );
      return;
    }

    const resultat = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.5, // mindre fil, hurtigere app
    });

    // Brugeren kan fortryde undervejs
    if (!resultat.canceled) {
      setBillede(resultat.assets[0].uri);
    }
  };

  // Samme som ovenfor, men henter et billede fra telefonens galleri i stedet.
  const vaelgFraGalleri = async () => {
    const resultat = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.5,
    });

    if (!resultat.canceled) {
      setBillede(resultat.assets[0].uri);
    }
  };

  // Gemmer varen og går tilbage til oversigten.
  // Har brugeren ikke skrevet et navn, kalder vi varen "Vare" -
  // billedet viser alligevel hvad det er.
  const gem = (antalDage) => {
    if (billede === null) {
      Alert.alert('Mangler billede', 'Tag et billede af varen først.');
      return;
    }

    const endeligtNavn = navn.trim() === '' ? 'Vare' : navn.trim();
    tilfoejVare(endeligtNavn, antalDage, billede);
    navigation.goBack();
  };

  // Bruges af feltet, hvor man selv skriver antal dage.
  const gemEgetAntal = () => {
    const antal = Number(egneDage);

    if (egneDage.trim() === '' || isNaN(antal) || antal < 0) {
      Alert.alert('Ugyldigt antal', 'Skriv et antal dage, f.eks. 5.');
      return;
    }

    gem(antal);
  };

  return (
    <View style={styles.side}>
      {/* Viser billedet hvis der er taget et, ellers en tom ramme */}
      {billede ? (
        <Image source={{ uri: billede }} style={styles.forhaandsvisning} />
      ) : (
        <View style={styles.tomRamme}>
          <Text style={styles.tomRammeTekst}>Intet billede endnu</Text>
        </View>
      )}

      <View style={styles.knapAfstand}>
        <Button title="Tag billede" onPress={tagBillede} />
      </View>

      <View style={styles.knapAfstand}>
        <Button title="Vælg fra galleri" color="#888" onPress={vaelgFraGalleri} />
      </View>

      {/* Valgfrit navn. Billedet er hovedsagen, så feltet må stå tomt. */}
      <TextInput
        style={[styles.input, styles.knapAfstand]}
        placeholder="Navn (valgfrit)"
        value={navn}
        onChangeText={setNavn}
      />

      <Text style={styles.label}>Hvor længe holder den?</Text>

      {/* De tre genveje. Et tryk gemmer varen med det samme. */}
      <View style={styles.hurtigRaekke}>
        <TouchableOpacity style={styles.hurtigKnap} onPress={() => gem(3)}>
          <Text style={styles.hurtigKnapTekst}>3 dage</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.hurtigKnap} onPress={() => gem(7)}>
          <Text style={styles.hurtigKnapTekst}>1 uge</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.hurtigKnap} onPress={() => gem(14)}>
          <Text style={styles.hurtigKnapTekst}>2 uger</Text>
        </TouchableOpacity>
      </View>

      {/* Passer ingen af genvejene, kan man skrive et tal i stedet. */}
      <View style={styles.egetAntalRaekke}>
        <TextInput
          style={styles.egetAntalFelt}
          placeholder="Andet antal dage"
          value={egneDage}
          onChangeText={setEgneDage}
          keyboardType="numeric"
        />
        <Button title="Gem" onPress={gemEgetAntal} />
      </View>
    </View>
  );
}