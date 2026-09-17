// styles.js
// Al styling er samlet her, så den kan genbruges på tværs af skærmene
// og rettes ét sted. Opgavekravet om styling i en separat fil løses her.

import { StyleSheet } from 'react-native';

// Farverne er samlet øverst, så de er nemme at ændre samlet.
const farver = {
  baggrund: '#ffffff',
  tekst: '#1c1c1e',
  daempet: '#6b6b70',
  streg: '#e4e4e7',
  kritisk: '#c0392b',
};

export default StyleSheet.create({
  // Fælles ramme om alle tre skærme
  side: {
    flex: 1,
    backgroundColor: farver.baggrund,
    padding: 20,
  },

  overskrift: {
    fontSize: 24,
    fontWeight: '600',
    color: farver.tekst,
    marginBottom: 16,
  },

  // Én række i listen på oversigten
  raekke: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: farver.streg,
  },

  vareNavn: {
    fontSize: 17,
    color: farver.tekst,
  },

  dage: {
    fontSize: 15,
    color: farver.daempet,
  },

  // Bruges når en vare udløber inden for to dage
  dageKritisk: {
    fontSize: 15,
    fontWeight: '600',
    color: farver.kritisk,
  },

  tom: {
    fontSize: 15,
    color: farver.daempet,
    marginTop: 24,
  },

  // Inputfelter på Tilføj-skærmen
  label: {
    fontSize: 15,
    color: farver.tekst,
    marginTop: 16,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: farver.streg,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: farver.tekst,
  },

  knapAfstand: {
    marginTop: 20,
  },

  knapBund: {
    paddingTop: 12,
  },

  // Detaljeskærmen
  detaljeNavn: {
    fontSize: 26,
    fontWeight: '600',
    color: farver.tekst,
    marginBottom: 12,
  },

  detaljeTekst: {
    fontSize: 16,
    color: farver.daempet,
    marginBottom: 6,
  },
});
