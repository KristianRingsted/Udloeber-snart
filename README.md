# Udløber snart

En mobilapp der holder styr på, hvornår maden i køleskabet udløber. Varer vises
sorteret efter hvad der ryger først, og alt inden for to dage markeres med rødt.

Bygget i React Native med Expo som del af godkendelsesopgave 1 i Innovation og
ny teknologi (HA(it.), CBS, efterår 2026).

## Demovideo

https://www.youtube.com/shorts/J6pjstK-BZ8

## Kom i gang

```bash
npm install
npx expo start
```

Scan QR-koden med Expo Go på telefonen, eller tryk `i` for iOS-simulator og `a`
for Android-emulator.

## Afhængigheder

Ud over Expo bruger projektet React Navigation:

```bash
npx expo install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

## Sådan er koden bygget op

```
App.js                      Navigation og appens data (varelisten)
screens/OversigtScreen.js   Forsiden med listen over varer
screens/TilfoejScreen.js    Formular til at tilføje en vare
screens/DetaljeScreen.js    Én vare, med mulighed for at slette den
styles/styles.js            Al styling, samlet ét sted
styles/hjaelp.js            Hjælpefunktioner til datoer
```

Varelisten ligger i `App.js` og deles med skærmene via React Context. Data gemmes
kun så længe appen kører — der er bevidst ingen database i denne version, da
formålet er at teste værditilbuddet hos brugerne, ikke at bygge en færdig backend.
