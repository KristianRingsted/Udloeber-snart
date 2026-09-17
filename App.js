// App.js
// Rodkomponenten. Her sættes navigationen op, og her ligger appens data (varerne),
// så alle tre skærme kan læse og ændre den samme liste.

import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OversigtScreen from './screens/OversigtScreen';
import TilfoejScreen from './screens/TilfoejScreen';
import DetaljeScreen from './screens/DetaljeScreen';

// Context bruges til at dele varelisten mellem skærmene uden at sende den
// igennem navigationen som parametre.
export const VareContext = createContext();

const Stack = createNativeStackNavigator();

// Hjælpefunktion: laver en dato der ligger X dage ude i fremtiden.
// Bruges kun til at lave startdata, så appen ikke er tom første gang den åbnes.
function omDage(antalDage) {
  const dato = new Date();
  dato.setDate(dato.getDate() + antalDage);
  return dato.toISOString();
}

export default function App() {
  // State: listen over varer. useState gør at appen tegnes om når listen ændres.
  const [varer, setVarer] = useState([
    { id: '1', navn: 'Mælk', udloeber: omDage(2) },
    { id: '2', navn: 'Kyllingefilet', udloeber: omDage(1) },
    { id: '3', navn: 'Hummus', udloeber: omDage(5) },
    { id: '4', navn: 'Rugbrød', udloeber: omDage(9) },
  ]);

  // Tilføjer en ny vare til listen.
  const tilfoejVare = (navn, antalDage) => {
    const nyVare = {
      id: Date.now().toString(), // simpelt unikt id
      navn: navn,
      udloeber: omDage(Number(antalDage)),
    };
    setVarer([...varer, nyVare]); // ny array frem for at ændre den gamle
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
