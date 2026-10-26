# Udløber snart

En mobilapp der holder styr på, hvornår maden i køleskabet udløber. Varer vises
sorteret efter hvad der ryger først, og alt inden for to dage markeres med rødt.
Varer oprettes hurtigst ved at tage et billede af dem.

Bygget i React Native med Expo som del af godkendelsesopgave 1 og 2 i Innovation
og ny teknologi (HA(it.), CBS, efterår 2026).

## Demovideo

https://www.youtube.com/shorts/ugP-Wrf_lg4

## Nyt i anden version

Ændringerne er lavet på baggrund af brugerinddragelsen i godkendelsesopgave 1,
hvor begge brugere pegede på, at det var for besværligt at skrive varerne ind
manuelt.

- Ny skærm hvor man opretter en vare ved at tage et billede eller vælge et fra
  galleriet, i stedet for at taste den ind
- Holdbarhed vælges med tre genvejsknapper eller ved selv at skrive et antal dage
- Navnet på varen er nu valgfrit, da billedet i praksis viser hvad varen er
- Billedet vises som miniature i listen og i fuld størrelse på detaljesiden
- Varerne gemmes lokalt med AsyncStorage, så de bliver husket når appen lukkes

## Kom i gang

```bash
npm install
npx expo start
```

Scan QR-koden med Expo Go på telefonen, eller tryk `i` for iOS-simulator og `a`
for Android-emulator.

## Afhængigheder

Ud over Expo bruger projektet React Navigation, AsyncStorage og ImagePicker:

```bash
npx expo install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npx expo install expo-image-picker
```

Projektet kører på Expo SDK 58.

## Sådan er koden bygget op

```
App.js                           Navigation, varelisten og lagring
screens/OversigtScreen.js        Forsiden med listen over varer
screens/HurtigTilfoejScreen.js   Opret en vare med billede
screens/TilfoejScreen.js         Opret en vare manuelt med navn og dato
screens/DetaljeScreen.js         Én vare med billede, og mulighed for at slette
styles/styles.js                 Al styling, samlet ét sted
styles/hjaelp.js                 Hjælpefunktioner til datoer
```

Varelisten ligger i `App.js` og deles med skærmene via React Context. Den gemmes
på telefonen med AsyncStorage, så varerne er der stadig næste gang appen åbnes.

Billeder gemmes som en sti til telefonens cache og ikke som selve filen. Det er
tilstrækkeligt til en MVP, men betyder at et billede kan forsvinde, hvis
telefonen rydder op i cachen.
