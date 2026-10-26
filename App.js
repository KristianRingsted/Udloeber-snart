// App.js
// Rodkomponenten. Her sættes navigationen op, og her ligger appens data (varerne),
// så alle tre skærme kan læse og ændre den samme liste.
// Varerne gemmes nu med AsyncStorage, så de overlever at appen lukkes.

import React, { useState, useEffect, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OversigtScreen from './screens/OversigtScreen';
import TilfoejScreen from './screens/TilfoejScreen';
import DetaljeScreen from './screens/DetaljeScreen';

export const VareContext = createContext();

const Stack = createNativeStackNavigator();

// Nøglen som varerne gemmes under på telefonen.
const GEM_NOEGLE = '@udloeber_snart_varer';

// Hjælpefunktion: laver en dato der ligger X dage ude i fremtiden.
function omDage(antalDage) {
  const dato = new Date();
  dato.setDate(dato.getDate() + antalDage);
  return dato.toISOString();
}

// Startdata, så appen ikke er helt tom allerførste gang den åbnes.
const startVarer = [
  { id: '1', navn: 'Mælk', udloeber: omDage(2), billede: null },
  { id: '2', navn: 'Kyllingefilet', udloeber: omDage(1), billede: null },
  { id: '3', navn: 'Hummus', udloeber: omDage(5), billede: null },
  { id: '4', navn: 'Rugbrød', udloeber: omDage(9), billede: null },
];

export default function App() {
  const [varer, setVarer] = useState([]);

  // Holder styr på om vi er færdige med at hente fra telefonen.
  // Uden den ville den tomme startliste nå at overskrive de gemte varer.
  const [indlaest, setIndlaest] = useState(false);

  // Kører én gang når appen starter: henter gemte varer frem.
  useEffect(() => {
    const hentVarer = async () => {
      try {
        const gemt = await AsyncStorage.getItem(GEM_NOEGLE);
        if (gemt !== null) {
          setVarer(JSON.parse(gemt)); // der var gemt noget
        } else {
          setVarer(startVarer); // første gang appen åbnes
        }
      } catch (fejl) {
        console.log('Kunne ikke hente varer:', fejl);
        setVarer(startVarer);
      }
      setIndlaest(true);
    };

    hentVarer();
  }, []);

  // Kører hver gang listen ændrer sig: gemmer den nye version.
  useEffect(() => {
    if (!indlaest) return; // vent til vi har hentet først

    const gemVarer = async () => {
      try {
        await AsyncStorage.setItem(GEM_NOEGLE, JSON.stringify(varer));
      } catch (fejl) {
        console.log('Kunne ikke gemme varer:', fejl);
      }
    };

    gemVarer();
  }, [varer, indlaest]);

  // Tilføjer en ny vare. Billedet er valgfrit.
  const tilfoejVare = (navn, antalDage, billede = null) => {
    const nyVare = {
      id: Date.now().toString(),
      navn: navn,
      udloeber: omDage(Number(antalDage)),
      billede: billede,
    };
    setVarer([...varer, nyVare]);
  };

  // Fjerner en vare ud fra dens id.
  const sletVare = (id) => {
    setVarer(varer.filter((vare) => vare.id !== id));
  };

  return (
    <VareContext.Provider value={{ varer, tilfoejVare, sletVare }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Oversigt">
          <Stack.Screen
            name="Oversigt"
            component={OversigtScreen}
            options={{ title: 'Udløber snart' }}
          />
          <Stack.Screen
            name="Tilfoej"
            component={TilfoejScreen}
            options={{ title: 'Tilføj vare' }}
          />
          <Stack.Screen
            name="Detalje"
            component={DetaljeScreen}
            options={{ title: 'Vare' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </VareContext.Provider>
  );
}